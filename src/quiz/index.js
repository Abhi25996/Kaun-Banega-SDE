import React, {useEffect, useState} from "react";
import * as PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {findAllUsersThunk, updateLoggedInUserThunk, updateUserThunk} from "../services/user-thunks";
import {findAllQuestionsThunk} from "../services/bank-thunks";
import {useNavigate} from "react-router-dom";

const QuizBank = () =>{

    const {questions, loadingBank} = useSelector(
        state => state.bank)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {currentUser} = useSelector(
        state => state.auth)
    const [state, setState] = useState(0);
    const [score, setScore] = useState(0);
    const [currentQuestionIndex, setQuestionIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(questions[currentQuestionIndex])


    const handleClick = () =>{
        if(state==0){
            if(currentUser == null){
                alert("Please LOGIN to submit answer");
                if (currentQuestionIndex +1 >= questions.length) {
                    setState(3)
                }
                else{
                    setQuestionIndex(currentQuestionIndex+1)
                    setCurrentQuestion(questions[currentQuestionIndex])
                }

            }
            else{
                let temp =document.querySelector('input[name="options"]:checked')
                let correctAnswers = (currentUser.correctQuestionList? [...currentUser.correctQuestionList]:[])
                let incorrectAnswers = (currentUser.inCorrectQuestionList? [...currentUser.inCorrectQuestionList]:[])
                if(correctAnswers.includes(currentQuestion._id)){
                    correctAnswers.splice(correctAnswers.indexOf(currentQuestion._id), 1)
                }
                if(incorrectAnswers.includes(currentQuestion._id)){
                    incorrectAnswers.splice(incorrectAnswers.indexOf(currentQuestion._id), 1)
                }

                if(temp?.value === currentQuestion.correct) {
                    let payload = {...currentUser, correctQuestionList: [correctAnswers, currentQuestion._id], inCorrectQuestionList: incorrectAnswers}
                    dispatch(updateLoggedInUserThunk(payload));
                    dispatch(updateUserThunk(payload));
                    setState(1);
                    setScore(score + 1);
                }
                else{
                    let payload = {...currentUser, correctQuestionList:correctAnswers, inCorrectQuestionList: [incorrectAnswers, currentQuestion._id]}
                    dispatch(updateLoggedInUserThunk(payload));
                    dispatch(updateUserThunk(payload));
                    setState(2);
                }
            }
        }
        else if(state ==1 || state ==2){
            if (currentQuestionIndex +1 >= 3) {setState(3)
                dispatch(updateUserThunk({...currentUser, totalScore: currentUser.totalScore+score}))
                dispatch(updateLoggedInUserThunk({...currentUser, totalScore: currentUser.totalScore+score}))}
            else{
                setQuestionIndex(currentQuestionIndex+1)
                setCurrentQuestion(questions[currentQuestionIndex])
                setState(0);
            }
        }
    }
    const Option = ({op}) =>{

        return(
            <div className="custom-control custom-radio" >
                <input type="radio"
                        id={op}
                        className="custom-control-input"
                        name="options"
                        value = {op}
                        style={{background: "#ffd200f0"}}

                />
                    <label className="form-label custom-control-label" htmlFor={op}>{op}</label></div>
        );
    }

    return(
        <section className="py-4 py-xl-5">
            <div className="container">
                <div className="border rounded border-0 border-primary overflow-hidden" style={{background:"#24285b"}}>
                    {questions.length==0? navigate("/startQuiz"):
                    <div className="row">
                        <div className="col-md-12 d-flex flex-column justify-content-center">
                            {state==3?
                                <div className="text-white p-4 p-md-5" >
                                    <h3 className="fw-bold pb-md-4 pt-2 text-center"
                                        style={{maxWidth: "850px", paddingRight: "0px",marginRight:"0px"}}>Congratulations! You have Submitted the QUIZ!</h3>
                                    <div  className="row" style={{alignContent: "center"}}>
                                        <div className="col-4"></div>
                                        <img  className="col-4" src="./assets/img/trophy.png" style={{maxHeight: "200px"}} />
                                        <div className="col-4"></div>
                                    </div>
                                    <h5 className="fw-bold pb-md-4 pt-2 text-center"
                                        style={{maxWidth: "850px", paddingRight: "0px",marginRight:"0px"}}>Your Score is {score}/{questions.length}</h5>

                                    <div className="row">
                                        <div class="col-4"></div>
                                    <button className="col-4 btn btn-warning" role="button" onClick = {()=>navigate('/')} style={{background: "#ffd200f0", maxWidth: "850px", padding: "0px",margin:"0px"}}>
                                    Go Home
                                    </button>
                                        <div className="col-4"></div>
                                    </div>


                                </div>
                                :
                            <div className="text-white p-4 p-md-5"><a
                                className="btn btn-warning me-2 mt-2" role="button" href="#"
                                style={{background: "#ffd200f0"}}>{currentQuestion.category}</a>
                                <h3 className="fw-bold pb-md-4 pt-2"
                                    style={{maxWidth: "850px", paddingRight: "0px",marginRight:"0px"}}>{currentQuestion?.question}</h3>
                                <div>
                                    <fieldset>
                                        {console.log("CURRENT : ", currentQuestion)}
                                        {
                                            currentQuestion?.options.map(op =><Option op = {op}/>)
                                        }
                                    </fieldset>
                                </div>

                                <p className="mb-4" style={{maxWidth:"850px", background:"#bc1c1c"}}>
                                    {state==2? "Unfortunately that was Incorrect! The correct Answer is :" +currentQuestion?.correct :""}
                                </p>

                                <p className="mb-4" style={{maxWidth:"850px", background:"#13661b"}}>{state==1?" You have answered the question CORRECTLY":""}</p>

                                <p className="mb-4" style={{maxWidth:"850px"}}> {state==1 ||state==2?
                                    currentQuestion?.completeAnswer  : "" }
                                </p>

                                <button className="btn btn-warning me-2 mt-2" role="button" onClick = {handleClick} style={{background: "#ffd200f0"}}>
                                    {state==0? "Submit Answer": "Next Question"}</button>
                            </div>}
                        </div>

                    </div>}
                </div>
            </div>
        </section>

    );
}

export default QuizBank