import {Link, useNavigate} from "react-router-dom";
import {useLocation} from "react-router";
import {useSelector} from "react-redux";

const NavBar = () =>{
    const {pathname} = useLocation();
    const paths = pathname.split('/')
    const active = paths[paths.length-1];
    const {currentUser} = useSelector(
        state => state.auth)
    const navigate = useNavigate();
    console.log(paths)
    console.log(active)
    console.log(currentUser)
    return(
        <nav className="navbar navbar-light navbar-expand-md fixed-top navbar-shrink py-3" id="mainNav">
            <div className="container"><a className="navbar-brand d-flex align-items-center" href="/"><span>Brand</span></a>
                <button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-1"><span
                    className="visually-hidden">Toggle navigation</span><span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navcol-1">
                    <ul className="navbar-nav mx-auto">
                        <Link to="/" className={active==""? "nav-link fw-bolder text-primary":"nav-link"}>Home</Link>
                        <Link to="/profile" className={active=="profile"? "nav-link fw-bolder text-primary":"nav-link"}>Profile</Link>
                        <Link to="/startQuiz" className={active=="startQuiz"? "nav-link fw-bolder text-primary":"nav-link"}>Quiz</Link>
                        <Link to="/allUsers" className={active=="allUsers"? "nav-link fw-bolder text-primary":"nav-link"}>Users</Link>
                        <Link to="/search" className={active=="search"? "nav-link fw-bolder text-primary":"nav-link"}>Search</Link>
                        <Link to="/addQuestion" className={active=="addQuestion"? "nav-link fw-bolder text-primary":"nav-link"}>Add Questions</Link>
                        <Link to="/manage" className={active=="manage"? "nav-link fw-bolder text-primary":"nav-link"}>Manage</Link>
                        {currentUser?<a to="/manage" className={active=="manage"? "nav-link fw-bolder text-primary":"nav-link"}>Logout</a> : <></>}
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