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
import NavigationSidebar from "./navigation-sidebar";
import MyProfile from "./profile";
import EditProfile from "./edit-profile";
import QuizBank from "./quiz";
import NavBar from "./navBar";
const store = configureStore(
    {reducer: {users: userReducer, bank: bankReducer, auth:authReducer}});

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
                    <Route path="/startQuiz" element={<QuizBank/>}/>

                  </Routes>


          </Provider>

      </BrowserRouter>
      </>

  );
}

export default App;
