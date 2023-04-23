import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateLoggedInUserThunk, updateUserThunk} from "../services/user-thunks";
import {useNavigate} from "react-router-dom";

const StartQuiz = () => {
    const {questions} = useSelector(
        state => state.bank)
    const {currentUser} = useSelector(
        state => state.auth)
    const category = [...new Set(questions.map((item) => item.category))];
    const questionType = ["All", "Only Unanswered", "Only Answered"]
    const [selectedCategory, setCategory] = useState(category[0]);
    const [selectQuestionType, setQuestionType] = useState(questionType[0]);
    const [limit, setLimit] = useState(5);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [state, setState] = useState(0);
    const [showQuiz, setShow] = useState(0);
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [score, setScore] = useState(0);
    const [currentQuestionIndex, setQuestionIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(questions[0])


    const handleClick = () => {
        if (state == 0) {
            if (currentUser == null) {
                alert("Please LOGIN to submit answer");
                if (currentQuestionIndex + 1 >= filteredQuestions.length) {
                    setState(3)
                } else {
                    setQuestionIndex(currentQuestionIndex + 1)
                    setCurrentQuestion(filteredQuestions[currentQuestionIndex])
                }

            } else {
                let temp = document.querySelector('input[name="options"]:checked')
                let correctAnswers =  [...currentUser.correctQuestionList]
                let incorrectAnswers = [...currentUser.inCorrectQuestionList]
                if (correctAnswers.includes(currentQuestion._id)) {
                    correctAnswers.splice(correctAnswers.indexOf(currentQuestion._id), 1)
                }
                if (incorrectAnswers.includes(currentQuestion._id)) {
                    incorrectAnswers.splice(incorrectAnswers.indexOf(currentQuestion._id), 1)
                }
                console.log("CORRECT  :" , correctAnswers)
                console.log("Incorrect : ", incorrectAnswers)

                if (temp?.value === currentQuestion.correct) {
                    let payload = {
                        ...currentUser,
                        correctQuestionList: [...correctAnswers , currentQuestion._id],
                        inCorrectQuestionList: incorrectAnswers
                    }
                    console.log("Payload", payload)
                    dispatch(updateLoggedInUserThunk(payload));
                    dispatch(updateUserThunk(payload));
                    setState(1);
                    setScore(score + 1);
                } else {
                    let payload = {
                        ...currentUser,
                        correctQuestionList: correctAnswers,
                        inCorrectQuestionList: [...incorrectAnswers , currentQuestion._id]
                    }
                    console.log("Payload", payload)
                    dispatch(updateLoggedInUserThunk(payload));
                    dispatch(updateUserThunk(payload));
                    setState(2);
                }

            }
        } else if (state == 1 || state == 2) {
            if (currentQuestionIndex + 1 >= filteredQuestions.length) {
                setState(3)
                dispatch(updateUserThunk({...currentUser, totalScore: currentUser.totalScore + score}))
                dispatch(updateLoggedInUserThunk({...currentUser, totalScore: currentUser.totalScore + score}))
            } else {
                setQuestionIndex(currentQuestionIndex + 1)
                setCurrentQuestion(filteredQuestions[currentQuestionIndex+1])
                setState(0);
                console.log("CURRENT QUESTION : ", currentQuestion)
            }
        }
    }
    const Option = ({op}) => {
        return (
            <div className="custom-control custom-radio">
                <input type="radio"
                       id={op}
                       className="custom-control-input"
                       name="options"
                       value={op}
                       style={{background: "#ffd200f0"}}

                />
                <label className="form-label custom-control-label" htmlFor={op}>{op}</label></div>
        );
    }

    const GetFilteredQuestions = () =>{
        let filteredQuestions = questions.filter(quest => quest.category === selectedCategory);
        if(questionType.indexOf(selectQuestionType) ==1){
            filteredQuestions = filteredQuestions.filter(quest => !currentUser.correctQuestionList.includes(quest._id))
            filteredQuestions = filteredQuestions.filter(quest => !currentUser.inCorrectQuestionList.includes(quest._id))
        }
        else if(questionType.indexOf(selectQuestionType) ==2){
            filteredQuestions = filteredQuestions.filter(quest => currentUser.correctQuestionList.includes(quest._id)||currentUser.inCorrectQuestionList.includes(quest._id))
        }
        filteredQuestions = filteredQuestions.slice(0, limit>filteredQuestions.length? filteredQuestions.length: limit);
        setFilteredQuestions([...filteredQuestions])
        setShow(true)
        setCurrentQuestion(filteredQuestions[currentQuestionIndex])

    }


    return (
        <>
        {
            showQuiz?
                <header className="pt-5">
                    <section className="py-4 py-xl-5">
                        <div className="container">
                            <div className="border rounded border-0 border-primary overflow-hidden"
                                 style={{background: "#24285b"}}>
                                {filteredQuestions.length == 0 ? setShow(false) :
                                    <div className="row">
                                        <div className="col-md-12 d-flex flex-column justify-content-center">
                                            {state == 3 ?
                                                <div className="text-white p-4 p-md-5">
                                                    <h3 className="fw-bold pb-md-4 pt-2 text-center"
                                                        style={{
                                                            maxWidth: "850px",
                                                            paddingRight: "0px",
                                                            marginRight: "0px"
                                                        }}>Congratulations! You have Submitted the QUIZ!</h3>
                                                    <div className="row" style={{alignContent: "center"}}>
                                                        <div className="col-4"></div>
                                                        <img className="col-4" src="./assets/img/trophy.png"
                                                             style={{maxHeight: "200px"}}/>
                                                        <div className="col-4"></div>
                                                    </div>
                                                    <h5 className="fw-bold pb-md-4 pt-2 text-center"
                                                        style={{
                                                            maxWidth: "850px",
                                                            paddingRight: "0px",
                                                            marginRight: "0px"
                                                        }}>Your Score is {score}/{filteredQuestions.length}</h5>

                                                    <div className="row">
                                                        <div class="col-4"></div>
                                                        <button className="col-4 btn btn-warning" role="button"
                                                                onClick={() => navigate('/')} style={{
                                                            background: "#ffd200f0",
                                                            maxWidth: "850px",
                                                            padding: "0px",
                                                            margin: "0px"
                                                        }}>
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
                                                        style={{
                                                            maxWidth: "850px",
                                                            paddingRight: "0px",
                                                            marginRight: "0px"
                                                        }}>{currentQuestion?.question}</h3>
                                                    <div>
                                                        <fieldset>
                                                            {
                                                                currentQuestion?.options.map(op => <Option op={op}/>)
                                                            }
                                                        </fieldset>
                                                    </div>

                                                    <p className="mb-4"
                                                       style={{maxWidth: "850px", background: "#bc1c1c"}}>
                                                        {state == 2 ? "Unfortunately that was Incorrect! The correct Answer is :" + currentQuestion?.correct : ""}
                                                    </p>

                                                    <p className="mb-4" style={{
                                                        maxWidth: "850px",
                                                        background: "#13661b"
                                                    }}>{state == 1 ? " You have answered the question CORRECTLY" : ""}</p>

                                                    <p className="mb-4"
                                                       style={{maxWidth: "850px"}}> {state == 1 || state == 2 ?
                                                        currentQuestion?.completeAnswer : ""}
                                                    </p>

                                                    <button className="btn btn-warning me-2 mt-2" role="button"
                                                            onClick={handleClick} style={{background: "#ffd200f0"}}>
                                                        {state == 0 ? "Submit Answer" : "Next Question"}</button>
                                                </div>}
                                        </div>

                                    </div>}
                            </div>
                        </div>
                    </section>
                </header>
                :
                <header className="pt-5">
                    <div className="container pt-4 pt-xl-5">
                        <div className="row pt-5">
                            <div className="container">
                                <div className="main-body">
                                    <div className="row gutters-sm">
                                        <div className="col-md-12">
                                            <div className="card mb-3">
                                                <div className="card-body bg-light">
                                                    <div className="text-center">
                                                        <h1 className="fw-bold display-4 m-2 mb-4" style={{
                                                            textDecoration: "underline",
                                                            textDecorationColor: "#ffd200",
                                                            textDecorationThickness: "8px"
                                                        }}>Start Quiz</h1>
                                                    </div>
                                                    {/*Category Selection*/}
                                                    <div className="row text-center">
                                                        <div className="col-sm-3">
                                                            <h6 className="mb-0">Choose the Category for the Quiz</h6>
                                                        </div>
                                                        <div className="col-sm-7 text-secondary">
                                                            <div className="dropdown show menu_links">
                                                                <select  onChange={(event) =>setCategory(event.target.value)}  name = "category" id="category">
                                                                    {category.map(cat => <option  value={cat}>{cat}</option>)}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr/>
                                                    {/* Limit Questions  */}
                                                    <div className="row text-center">
                                                        <div className="col-sm-3">
                                                            <h6 className="mb-0">Choose Type Of Question</h6>
                                                        </div>
                                                        <div className="col-sm-6 text-secondary">
                                                            <div className="dropdown show menu_links">
                                                                {currentUser==null?
                                                                    <select   name = "type" id="type"
                                                                              onChange={(event) =>setQuestionType(event.target.value)} disabled >
                                                                        {questionType.map(type => <option  value={type}>{type}</option>)}
                                                                    </select>
                                                                    :
                                                                    <select  name = "type" id="type"
                                                                             onChange={(event) =>setQuestionType(event.target.value)}>
                                                                        {questionType.map(type => <option  value={type}>{type}</option>)}
                                                                    </select>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-3 text-secondary"><p className="text-danger fw-bold"> ** This will be only enabled for LOGGED IN USERS</p></div>
                                                    </div>
                                                    <hr/>
                                                    <div className="row text-center">
                                                        <div className="col-sm-3">
                                                            <h6 className="mb-0">Choose Maximum Number of Questions</h6>
                                                        </div>
                                                        <div className="col-sm-7 text-secondary ">
                                                            <div className="dropdown show menu_links">
                                                                <select onChange={(event) =>setLimit(parseInt(event.target.value, 10))}  name = "limit" id="limit">
                                                                    {[ ...Array(20) ].map((l,i) => <option  value={i+1}>{i+1}</option>)}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr/>
                                                    <div className="row">
                                                        <div className="col-5"></div>
                                                        <div className="col-4">
                                                            <button className="btn btn-secondary" onClick = {GetFilteredQuestions}>Submit</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </header>
        }
        </>
    );
}

export default StartQuiz