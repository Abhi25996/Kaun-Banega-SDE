import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createQuestionThunk} from "../services/bank-thunks";
import {useNavigate} from "react-router-dom";

const CreateQuestion = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {questions} = useSelector(
        state => state.bank)
    const categories = [...new Set(questions.map((item) => item.category))];
    const {currentUser} = useSelector(
        state => state.auth)

    useEffect(()=>{
        if(!(currentUser && currentUser?.role !="User")) {
            alert ("You do not have the permission to access this page");
            navigate("/");
        }
        else {
            setShow(true);
        }

    },[])

    const [question, setQuestion] = useState("");
    const [show, setShow] = useState(false);
    const [correct, setCorrect] = useState("");
    const [option2, setOption2] = useState("");
    const [option3, setOption3] = useState("");
    const [option4, setOption4] = useState("");
    const [category, setCategory] = useState("Select Category");
    const [complete, setComplete] = useState("");
    const [msg, setMessage] = useState("");


    const handleSubmit = ()=>{
        if(question.length==0 || correct.length==0 || option2.length==0|| option4.length==0||option3.length==0 ||category=="Select Category") setMessage("Could not submit the request - All field must contain some data")
        else {
            setMessage("You have successfully added the question")
            let options = [correct, option2, option3, option4]

            let shuffledOptions = options
                .map(value => ({value, sort: Math.random()}))
                .sort((a, b) => a.sort - b.sort)
                .map(({value}) => value)
            const payload = {
                category: category,
                question: question,
                options: shuffledOptions,
                correct: correct,
                completeAnswer: complete
            }

            dispatch(createQuestionThunk(payload))
            console.log(payload)
            setQuestion("")
            setCategory(categories[0])
            setCorrect("")
            setOption2("");
            setOption3("")
            setOption4("")
            setComplete("")
        }
    }
    return (
        <> {show&&
        <section className="py-5 mt-5">
            <div className="container py-5">
                <div className="row">
                    <div className="col-md-8 col-xl-6 text-center mx-auto">
                        <h2 className="display-6 fw-bold mb-4">Want to add&nbsp;<span
                            className="underline">questions</span>?</h2>
                        <p className="text-muted">Use the form below to add questions.</p>
                        <p className={msg.includes("success")? "text-success fw-bold":"text-danger fw-bold"}>{msg}</p>
                    </div>
                </div>
                <div className="row d-flex justify-content-center">
                    <div className="col-md-11">
                        <div>
                            <div className="p-3 p-xl-4">
                                {/*Category*/}
                                <div className="mb-3">
                                    <div className="dropdown" style={{textAlign:"center"}}>
                                        <button className="btn btn-primary dropdown-toggle" aria-expanded="false"
                                                data-bs-toggle="dropdown" type="button"
                                                style={{textAlign:"center"}}>{category}&nbsp;</button>
                                        <div className="dropdown-menu">
                                            {categories.map(cat => <a className="dropdown-item" onClick={()=>setCategory(cat)}>{cat}</a>)}
                                        </div>
                                    </div>
                                </div>
                                {/*Question*/}
                                <div className="mb-3"><input className="shadow form-control" type="text" id="question"
                                                             name="question" value={question} placeholder="Enter the Question here ....." onChange={(event)=> setQuestion(event.target.value)}/></div>
                                {/*Correct Answer*/}
                                <div className="mb-3"><input className="shadow form-control" type="text" id="correct"
                                                             name="correct" placeholder="Enter the Correct Answer....." value={correct} onChange={(event)=> setCorrect(event.target.value)}/></div>

                                <div className="mb-3"><input className="shadow form-control" type="text" id="option1"
                                                             name="option1" placeholder="Enter the first option...." value = {correct} /></div>


                                <div className="mb-3"><input className="shadow form-control" type="text" id="option2"
                                                             name="option2" placeholder="Enter the second option...." value = {option2} onChange={(event)=> setOption2(event.target.value)}/></div>

                                <div className="mb-3"><input className="shadow form-control" type="text" id="option3"
                                                             name="option3" placeholder="Enter the third option...." value = {option3} onChange={(event)=> setOption3(event.target.value)}/></div>

                                <div className="mb-3"><input className="shadow form-control" type="text" id="option4"
                                                             name="option4" placeholder="Enter the Fourth option...." value = {option4} onChange={(event)=> setOption4(event.target.value)}/></div>

                                <div className="mb-3"><textarea className="shadow form-control" id="message-1"
                                                                name="message" rows="6"
                                                                placeholder="Answer Explanation" value={complete} onChange={(event)=> setComplete(event.target.value)}></textarea></div>
                                <div>
                                    <button className="btn btn-primary shadow d-block w-100" type="submit" onClick={handleSubmit}>Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>}</>
    )


}
export default CreateQuestion