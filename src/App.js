import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./home";
import SignUp from "./signup";
import LogIn from "./login";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./home/reducer"
import bankReducer from "./bank/reducer"
import authReducer from "./reducer/auth"
import articleReducer from "./reducer/articles"
import MyProfile from "./profile";
import EditProfile from "./edit-profile";
import NavBar from "./navBar";
import StartQuiz from "./quiz";
import CreateQuestion from "./createQuestion";
import Manage from "./manage";
import UserGrid from "./users";
import ShowUserProfile from "./profile/showOtherProfile";
import Footer from "./footer";
import Search from "./search";
const store = configureStore(
    {reducer: {users: userReducer, bank: bankReducer, auth:authReducer, articles:articleReducer}});

function App() {


  return (
      <>

      <BrowserRouter>

          <Provider store={store}>
              <NavBar/>

                  <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/login" element={<LogIn/>}/>
                    <Route path="/profile" element={<MyProfile/>}/>
                    <Route path="/editProfile" element={<EditProfile/>}/>
                    <Route path="/startQuiz" element={<StartQuiz/>}/>
                    <Route path="/addQuestion" element={<CreateQuestion/>}/>
                    <Route path="/allUsers" element={<UserGrid/>}/>
                    <Route path="/manage" element={<Manage/>}/>
                    <Route path="/profile/*" element={<ShowUserProfile/>}/>
                    <Route path="/search" element={<Search/>}/>

                  </Routes>

            <Footer/>

          </Provider>

      </BrowserRouter>
      </>

  );
}

export default App;
