import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {registerThunk} from "../services/user-thunks";

const SignUp = () =>{
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [date, setDate] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSignUp = async () => {
        const payload = {
            userName: userName,
            email: email,
            password: password,
            role : "User",
            qaRequested: false,
            qaApproved: false,
            firstName: firstName,
            lastName: lastName,
            website: "No website details found",
            mobile: mobile,
            dob: date,
            following:[],
            follower:[],
            questionsAnswered:0,
            maxScore:0,
            totalScore:0,
            additionalInfo: "No Additional Information found",
            questionSegregation:{git:0,"operating-system":0,"computer-network":0,"web-development":0,"algorithm-data-structure":0,"java":0,"software-engineering":0},
            inCorrectQuestionList: [],
            correctQuestionList:[],
        }
        try {
            const access = await dispatch(registerThunk(payload));
            if(access.payload===undefined){ alert("Invalid Credentials");}
            else {navigate("/");}
        } catch (e) {
            alert(e);
        }
    };


    return (
        <section className="py-4 py-xl-5">
            <div className="container">
                <div className="row mb-5">
                    <div className="col-md-8 col-xl-6 text-center mx-auto">
                        <h1 className="fonts"><strong><span style={{color: "#676767"}}>Sign Up</span></strong>
                        </h1>
                        <p style={{color: "#4e5d78", fontSize: "14px"}}>If you have not registered yourself yet, here
                            you go!</p>
                    </div>
                </div>
                <div className="row d-flex justify-content-center fonts">
                    <div className="col-md-6 col-xl-4">
                        <div className="card mb-5">
                            <div className="card-body d-flex flex-column align-items-center">
                                <div className="bs-icon-xl bs-icon-circle bs-icon-primary bs-icon my-4"
                                     style={{color: "#24285b", background: "#ffd200"}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor"
                                         viewBox="0 0 16 16" className="bi bi-person">
                                        <path
                                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"></path>
                                    </svg>
                                </div>
                                <div className="text-center">
                                    <div className="mb-3"><input className="form-control fonts" type="text" name="firstName"
                                                                 placeholder="First Name" value={firstName}
                                                                 onChange={(event) => setFirstName(event.target.value)}
                                                                 />
                                    </div>
                                    <div className="mb-3"><input className="form-control fonts" type="text" name="lastName"
                                                                 placeholder="Last Name"
                                                                 value={lastName}
                                                                 onChange={(event) => setLastName(event.target.value)}/>
                                    </div>
                                    <div className="mb-3"><input className="form-control fonts" type="tel" name="mobile"
                                                                 placeholder="Mobile"
                                                                 value={mobile}
                                                                 onChange={(event) => setMobile(event.target.value)}
                                                                 />
                                    </div>
                                    <div className="mb-3"><input className="form-control fonts" data-bs-toggle="tooltip"
                                                                 data-bss-tooltip="" data-bs-placement="right"
                                                                 name="dob" value={date} onChange={(event) => setDate(event.target.value)}
                                                                 type="date" required title="Please Enter your DOB"/>
                                    </div>
                                    <div className="mb-3"><input className="form-control fonts" type="email" name="email"
                                                                 placeholder="Email" required
                                                                 value={email}
                                                                 onChange={(event) => setEmail(event.target.value)}/></div>

                                    <div className="mb-3"><input className="form-control fonts" type="text" name="userName"
                                                                 placeholder="User Name" required=""
                                                                 value={userName}
                                                                 onChange={(event) => setUsername(event.target.value)}/></div>

                                    <div className="mb-3"><input className="form-control fonts" type="password"
                                                                 name="password" placeholder="Password"
                                                                 required=""
                                                                 value={password}
                                                                 onChange={(event) => setPassword(event.target.value)}/></div>

                                    <div className="mb-3">
                                        <button className="btn btn-primary d-block w-100 fonts" type="submit" onClick={handleSignUp}
                                                style={{background: "#1d2049"}}>Sign Up
                                        </button>
                                    </div>
                                    <p className="text-muted"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUp