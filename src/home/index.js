import Login from "../login";
import Features from "./features";
import LeaderBoard from "./leaderboard";
import FAQ from "./faq";
import Signup from "./signup";
import Footer from "../footer";
import Stats from "./stats";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {aboutMeThunk, findAllUsersThunk} from "../services/user-thunks";
import {findAllQuestionsThunk} from "../services/bank-thunks";
import {useNavigate} from "react-router-dom";
import UserStats from "./user-stats";




const Home = ()=>{
    const {users, loading} = useSelector(
        state => state.users)
    const {questions, loadingBank} = useSelector(
        state => state.bank)
    const {currentUser} = useSelector(
        state => state.auth)
    // console.log("CURRENT USER: ", currentUser)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(findAllUsersThunk());
        dispatch(findAllQuestionsThunk())
    }, [])
    const category = [...new Set(questions.map((item) => item.category))];
    const orderUsers = Object.values(users).sort((a, b) => b.totalScore - a.totalScore)

    return (

        <div>

            {/*Starting Section*/}
            <div className="container mt-5 pt-4 pt-xl-5">
                <div className="row pt-2">
                    <div className="col-md-8 text-center text-md-start mx-auto">
                        <div className="text-center">
                            <h1 className="display-4 fw-bold mb-2">A Step Closer to Becoming&nbsp;&nbsp;<span
                                className="underline">SDE</span>!</h1>
                            <p className="fs-5 text-muted mb-2">Level up your coding skills with our MCQ quiz app
                                designed exclusively for software engineers - Test your knowledge, learn, and grow!</p>
                            <form className="d-flex justify-content-center flex-wrap" method="post">
                                <div className="shadow-lg mb-3"></div>
                            </form>
                        </div>
                    </div>
                    <div className="col-12 col-lg-10 mx-auto">
                        <div className="text-center position-relative"><img className="img-fluid"
                                                                            src="./assets/img/home.png"
                                                                            style={{width: "800px"}}/></div>
                    </div>
                </div>
            </div>
            {/*User Stats*/}
            {currentUser? <UserStats user={{answered: currentUser.correctQuestionList.length+ currentUser.inCorrectQuestionList.length, unanswered: (questions.length- (currentUser.correctQuestionList.length+ currentUser.inCorrectQuestionList.length)), score: currentUser.totalScore, segregation: currentUser.questionSegregation}}/>:null}
            {/*Website Stats*/}
            {!loading && !loadingBank ?<Stats webStats = {{category: category.length,question: questions.length, users: orderUsers.length, article:20}}/>:<h2>Loading Stats......</h2>}
            {/*LeaderBoard Section*/}
            {!loading?<LeaderBoard members={orderUsers}/>:<h2>Loading Leaderboard......</h2>}
            {/* Feature Section*/}
            <Features/>
            {/*FAQ Section*/}
            <FAQ/>
            {/*Signup Section*/}
            {!currentUser?<Signup/>:null}


        </div>

    )
}
export default Home
