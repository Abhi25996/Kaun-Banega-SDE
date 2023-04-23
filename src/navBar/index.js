import {Link, useNavigate} from "react-router-dom";
import {useLocation} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {logoutThunk} from "../services/user-thunks";
import {useEffect} from "react";
import {reinitFetchedArticles} from "../reducer/articles";

const NavBar = () =>{
    const {pathname} = useLocation();
    const paths = pathname.split('/')
    const active = paths[paths.length-1];
    const {currentUser} = useSelector(
        state => state.auth)
    const navigate = useNavigate();
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(reinitFetchedArticles())
    }, [pathname])
    return(
        <nav className="navbar navbar-light navbar-expand-md fixed-top navbar-shrink py-3" id="mainNav">
            <div className="container"><a className="navbar-brand d-flex align-items-center" href="/"><span>Kaun Banega SDE</span></a>
                <button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-1"><span
                    className="visually-hidden">Toggle navigation</span><span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navcol-1">
                    <ul className="navbar-nav mx-auto">
                        <Link to="/" className={active==""? "nav-link fw-bolder text-primary":"nav-link"}>Home</Link>
                        {currentUser&&<Link to="/profile" className={active=="profile"? "nav-link fw-bolder text-primary":"nav-link"}>Profile</Link>}
                        <Link to="/startQuiz" className={active=="startQuiz"? "nav-link fw-bolder text-primary":"nav-link"}>Quiz</Link>
                        <Link to="/allUsers" className={active=="allUsers"? "nav-link fw-bolder text-primary":"nav-link"}>Users</Link>
                        <Link to="/search" className={active=="search"? "nav-link fw-bolder text-primary":"nav-link"}>Search</Link>

                        {(!currentUser || currentUser?.role == "User")?<></>: <Link to="/addQuestion" className={active=="addQuestion"? "nav-link fw-bolder text-primary":"nav-link"}>Add Questions</Link>}
                        {(currentUser && currentUser?.role == "Admin")&& <Link to="/manage" className={active=="manage"? "nav-link fw-bolder text-primary":"nav-link"}>Manage</Link>}
                        {currentUser?<a to ="/"className={active=="logout"? "nav-link fw-bolder text-primary":"nav-link"} onClick={()=>{
                            dispatch(logoutThunk())
                            navigate("/")}}>Logout</a> : <></>}
                    </ul>
                    {!currentUser?
                        <a className="btn btn-primary shadow" role="button" onClick={()=>navigate("/login")}>Login</a>
                        :
                        <a className="btn btn-primary shadow" role="button"  onClick={()=>navigate("/profile")}>Hi {currentUser.firstName}!</a>}
                </div>
            </div>
        </nav>
    )
}

export default NavBar