import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {registerThunk, updateLoggedInUserThunk, updateUserThunk} from "../services/user-thunks";
import {useNavigate} from "react-router-dom";

const EditProfile = () =>{
    const {currentUser} = useSelector(
        state => state.auth)
    // eslint-disable-next-line no-restricted-globals
    if(currentUser==null) location.href =  "/";
    const [firstName, setFirstName] = useState(currentUser.firstName);
    const [lastName, setLastName] = useState(currentUser.lastName);
    const [website, setWebsite] = useState(currentUser.website);
    const [mobile, setMobile] = useState(currentUser.mobile);
    const [bio, setBio] = useState(currentUser.additionalInfo);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleEditProfile= async() =>{
            const payload = {
                ...currentUser,
                firstName: firstName,
                lastName: lastName,
                website: website,
                mobile: mobile,
                additionalInfo: bio,
            }
            try {
                await dispatch(updateUserThunk(payload));
                dispatch(updateLoggedInUserThunk(payload))
                navigate("/profile");
            } catch (e) {
                alert(e);
            }
        };


    const LineItems = ({information, edit}) => {
        return (
            <div className="row">
                <div className="col-sm-3">
                    <h6 className="mb-0">{information.title}</h6>
                </div>
                <div className="col-sm-9 text-info fw-bolder">{information.value}</div>
            </div>
        )
    }

    return (
        <div className="pt-5">
            <div className="container pt-4 pt-xl-5">
                <div className="row pt-5">
                    <div className="container">
                        <div className="main-body">
                            {/*Basic Information*/}
                            <div className="row gutters-sm">
                                {/*Profile Image and first Column Information*/}
                                <div className="col-md-4 mb-3">
                                    {/*User Image and details*/}
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex flex-column align-items-center text-center">
                                                <img src={`./assets/img/icons/${currentUser.iconPath}`}
                                                     alt="Admin"
                                                     className="rounded-circle" width="150"/>
                                                <div className="mt-3">
                                                    <h4>{firstName} {lastName}</h4>
                                                    <p className="text-info fw-bolder mb-1">@{currentUser.userName}</p>
                                                    {/*<button className="m-2 btn btn-primary">Follow</button>*/}
                                                    <button className="btn btn-primary">
                                                        {currentUser.qaApproved ? "Question Admin" : currentUser.qaRequested ? "Already Requested Question Admin" :
                                                            "Request Question Admin"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/*About Me Section*/}
                                <div className="col-md-8">
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className="text-center">
                                                <h1 className="fw-bold display-4 m-2 mb-4"><span
                                                    className="underline" style={{
                                                    textDecoration: "underline",
                                                    textDecorationColor: "#ffd200",
                                                    textDecorationThickness: "8px"
                                                }}>About Me</span>
                                                </h1>
                                            </div>
                                            <LineItems information={{title: "User Name", value: currentUser.userName}}/>
                                            <hr/>
                                            {/*Editable First Name*/}
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">First Name</h6>
                                                </div>
                                                <div className="col-sm-9 text-info">
                                                    <input className="form-control fonts text-info fw-bolder" type="text" name="firsName"
                                                    placeholder="first Name"
                                                    value={firstName}
                                                    onChange={(event) => setFirstName(event.target.value)}/>
                                                </div>
                                            </div>
                                            <hr/>
                                            {/*Editable Last Name*/}
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Last Name</h6>
                                                </div>
                                                <div className="col-sm-9 text-info">
                                                    <input className="form-control fonts text-info fw-bolder" type="text" name="lastName"
                                                           placeholder="Last Name"
                                                           value={lastName}
                                                           onChange={(event) => setLastName(event.target.value)}/>
                                                </div>
                                            </div>
                                            <hr/>
                                            {/*Editable Profile Website Link*/}
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Website</h6>
                                                </div>
                                                <div className="col-sm-9 text-info">
                                                    <input className="form-control fonts text-info fw-bolder" type="text" name="website"
                                                           placeholder="Website/Linkedin Profile..."
                                                           value={website}
                                                           onChange={(event) => setWebsite(event.target.value)}/>
                                                </div>
                                            </div>
                                            <hr/>
                                            <LineItems information={{title: "Email", value: currentUser.email}}/>
                                            <hr/>
                                            <LineItems information={{title: "DOB", value: currentUser.dob}}/>
                                            <hr/>
                                            {/*Editable Mobile Name*/}
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Mobile</h6>
                                                </div>
                                                <div className="col-sm-9 text-info">
                                                    <input className="form-control fonts text-info fw-bolder" type="text" name="mobile"
                                                           placeholder="Mobile"
                                                           value={mobile}
                                                           onChange={(event) => setMobile(event.target.value)}/>
                                                </div>
                                            </div>
                                            <hr/>
                                            {/*Editable Bio*/}
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Bio</h6>
                                                </div>
                                                <div className="col-sm-9 text-info">
                                                    <input className="form-control fonts text-info fw-bolder" type="text" name="bio"
                                                           placeholder="Add more about me...."
                                                           value={bio}
                                                           onChange={(event) => setBio(event.target.value)}/>
                                                </div>
                                            </div>
                                            <hr/>
                                            <div className="row">
                                                <div className="col-sm-12 text-center">
                                                    <a className="btn btn-secondary"
                                                       onClick={handleEditProfile}>Save</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default EditProfile