import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {loginThunk} from "../services/user-thunks";

const LogIn = () =>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogin = async () => {
        try {
            const access = await dispatch(loginThunk({ username, password }));
            if(access.payload===undefined){ alert("Invalid Credentials");}
            else {navigate("/");}
        } catch (e) {
            alert(e);
        }
    };

    return (

        <section className="py-4 py-md-5 my-5">
            <div className="container py-md-5">
                <div className="row">
                    <div className="col-md-6 text-center"><img className="img-fluid w-100"
                                                               src="assets/img/login.svg"/></div>
                    <div className="col-md-5 col-xl-4 text-center text-md-start">
                        <h2 className="display-6 fw-bold mb-5"><span
                            className="underline pb-1"><strong>Login</strong><br/></span></h2>
                        <div>
                            <div className="mb-3"><input className="shadow form-control" type="text" value={username}
                                                         onChange={(event) => setUsername(event.target.value)}
                                                         placeholder="Username"
                                                         title="Enter your unique Alpha Numeric User Name"
                            /></div>
                            <div className="mb-3"><input className="shadow form-control" type="password"
                                                         value={password}
                                                         onChange={(event) => setPassword(event.target.value)}
                                                         placeholder="Password"
                                                         required=""/></div>
                            <div className="mb-3">
                                <button className="btn btn-primary d-block w-100 fonts" type="submit" onClick={handleLogin}
                                        style={{background: "#1d2049"}}>Login
                                </button>
                            </div>
                            <p className="text-muted">Don't have an account yet?&nbsp;<a href="/signup">Sign
                                Up</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>


    )
}

export default LogIn