// import {useSelector} from "react-redux";
// import {useState} from "react";
// import QuizBank from "./index";
//
// const StartQuiz = () =>{
//     const {questions} = useSelector(
//         state => state.bank)
//     const {currentUser} = useSelector(
//         state => state.auth)
//     const category = [...new Set(questions.map((item) => item.category))];
//     const questionType = ["All", "Only Unanswered", "Only Answered"]
//     const [selectedCategory, setCategory] = useState(category[0]);
//     const [selectQuestionType, setQuestionType] = useState(questionType[0]);
//
//     const GetFilteredQuestions = () =>{
//         console.log("CLICKED")
//         let filteredQuestions = questions.filter(quest => quest.category === selectedCategory);
//         if(questionType.indexOf(selectQuestionType) ==1){
//             filteredQuestions = filteredQuestions.filter(quest => !currentUser.correctQuestionList.includes(quest._id))
//             filteredQuestions = filteredQuestions.filter(quest => !currentUser.inCorrectQuestionList.includes(quest._id))
//         }
//         else if(questionType.indexOf(selectQuestionType) ==2){
//             filteredQuestions = filteredQuestions.filter(quest => currentUser.correctQuestionList.includes(quest._id)||currentUser.inCorrectQuestionList.includes(quest._id))
//         }
//         <QuizBank filteredQuestions/>
//
//     }
//
//     return(<header className="pt-5">
//         <div className="container pt-4 pt-xl-5">
//             <div className="row pt-5">
//                 <div className="container">
//                     <div className="main-body">
//                         <div className="row gutters-sm">
//                             <div className="col-md-12">
//                                 <div className="card mb-3">
//                                     <div className="card-body bg-light">
//                                         <div className="text-center">
//                                             <h1 className="fw-bold display-4 m-2 mb-4" style={{
//                                                 textDecoration: "underline",
//                                                 textDecorationColor: "#ffd200",
//                                                 textDecorationThickness: "8px"
//                                             }}>Start Quiz</h1>
//                                         </div>
//                                         {/*Category Selection*/}
//                                         <div className="row text-center">
//                                             <div className="col-sm-3">
//                                                 <h6 className="mb-0">Choose the Category for the Quiz</h6>
//                                             </div>
//                                             <div className="col-sm-7 text-secondary">
//                                                 <div className="dropdown show menu_links">
//                                                     <select  onChange={(event) =>setCategory(event.target.value)}  name = "category" id="category">
//                                                         {category.map(cat => <option  value={cat}>{cat}</option>)}
//                                                     </select>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <hr/>
//                                         {/* Question Types  */}
//                                         <div className="row text-center">
//                                             <div className="col-sm-3">
//                                                 <h6 className="mb-0">Choose Type Of Question</h6>
//                                             </div>
//                                             <div className="col-sm-6 text-secondary">
//                                                 <div className="dropdown show menu_links">
//                                                     {currentUser==null?
//                                                         <select   name = "type" id="type"
//                                                                   onChange={(event) =>setQuestionType(event.target.value)} disabled >
//                                                             {questionType.map(type => <option  value={type}>{type}</option>)}
//                                                         </select>
//                                                         :
//                                                         <select  name = "type" id="type"
//                                                                  onChange={(event) =>setQuestionType(event.target.value)}>
//                                                             {questionType.map(type => <option  value={type}>{type}</option>)}
//                                                         </select>
//                                                     }
//                                                 </div>
//                                             </div>
//                                             <div className="col-sm-3 text-secondary"><p className="text-danger fw-bold"> ** This will be only enabled for LOGGED IN USERS</p></div>
//                                         </div>
//                                         <hr/>
//                                         <div className="row">
//                                             <div className="col-5"></div>
//                                             <div className="col-4">
//                                                 <button className="btn btn-secondary" onClick = {GetFilteredQuestions}>Submit</button>
//                                             </div>
//                                         </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//
//                 </div>
//             </div>
//         </div>
//     </div>
// </header>)
// }
//
// export default StartQuiz
