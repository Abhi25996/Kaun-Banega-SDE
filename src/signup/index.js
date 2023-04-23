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
    const icons = ["icon-1.png","icon-2.png","icon-3.png","icon-4.png","icon-5.png","icon-6.png"]
    const handleSignUp = async () => {
        const icon = icons[Math.floor(Math.random() * (5 + 1))]
        console.log(icon)
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
            iconPath:icon,
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
        <section className="py-4 py-md-5 my-5">
            <div className="container py-md-5">
                <div className="row">
                    <div className="col-md-6 text-center"><img className="img-fluid w-100"
                                                               src="assets/img/register.svg"/></div>
                    <div className="col-md-5 col-xl-4 text-center text-md-start">
                        <h2 className="display-6 fw-bold mb-5"><span className="underline pb-1"><strong>Sign up</strong></span>
                        </h2>
                        <div >
                            <div className="mb-3"><input className="form-control fonts shadow" type="text" name="firstName"
                                                          placeholder="First Name" value={firstName}
                                                          onChange={(event) => setFirstName(event.target.value)}
                            />
                            </div>
                            <div className="mb-3"><input className="form-control fonts shadow" type="text" name="lastName"
                                                         placeholder="Last Name"
                                                         value={lastName}
                                                         onChange={(event) => setLastName(event.target.value)}/>
                            </div>
                            <div className="mb-3"><input className="form-control fonts shadow" type="tel" name="mobile"
                                                         placeholder="Mobile"
                                                         value={mobile}
                                                         onChange={(event) => setMobile(event.target.value)}
                            />
                            </div>
                            <div className="mb-3"><input className="form-control fonts shadow" data-bs-toggle="tooltip"
                                                         data-bss-tooltip="" data-bs-placement="right"
                                                         name="dob" value={date} onChange={(event) => setDate(event.target.value)}
                                                         type="date" required title="Please Enter your DOB"/>
                            </div>
                            <div className="mb-3"><input className="form-control fonts shadow" type="email" name="email"
                                                         placeholder="Email" required
                                                         value={email}
                                                         onChange={(event) => setEmail(event.target.value)}/></div>

                            <div className="mb-3"><input className="form-control fonts shadow" type="text" name="userName"
                                                         placeholder="User Name" required=""
                                                         value={userName}
                                                         onChange={(event) => setUsername(event.target.value)}/></div>

                            <div className="mb-3"><input className="form-control fonts shadow" type="password"
                                                         name="password" placeholder="Password"
                                                         required=""
                                                         value={password}
                                                         onChange={(event) => setPassword(event.target.value)}/></div>

                    <div className="mb-5">
                                <button className="btn btn-primary d-block w-100 fonts" type="submit" onClick={handleSignUp}
                                        style={{background: "#1d2049"}}>Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUp