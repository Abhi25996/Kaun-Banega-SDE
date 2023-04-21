import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {updateLoggedInUserThunk, updateUserThunk} from "../services/user-thunks";

const MyProfile = () => {

    const {currentUser} = useSelector(
        state => state.auth)
    const {users, loading} = useSelector(
        state => state.users)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // eslint-disable-next-line no-restricted-globals
    if(currentUser==null) location.href="/"

    const followMoreList = users.filter(user => (!currentUser?.following.includes(user?._id) && user?._id != currentUser?._id))
    const followingList = users.filter(user => (currentUser?.following.includes(user?._id)))
    const followersList = users.filter(user => (currentUser?.followers.includes(user?._id)))
    const LineItems = ({information}) => {
        return (
            <div className="row">
                <div className="col-sm-3">
                    <h6 className="mb-0">{information.title}</h6>
                </div>

                <div className="col-sm-9 text-info fw-bolder">{information.value}</div>
            </div>
        )
    }

    const updateFollowing = (id, followingRequested)=>{
        const u = users.filter(user => user._id == id);
        console.log("USER", u)
        console.log(u[0]._id)
        if(followingRequested) {

            dispatch(updateUserThunk({...u[0], followers: [].concat(...u[0].followers, currentUser?._id)}))
            dispatch(updateUserThunk({...currentUser, following: [].concat(currentUser?.following, id)}))
            dispatch(updateLoggedInUserThunk({...currentUser, following: [].concat(currentUser?.following, id)}))

        }
        else{
            let followers =[...u[0].followers]
            followers.splice(followers.indexOf(currentUser?._id), 1)
            dispatch(updateUserThunk({...u[0], followers: followers}))

            let following =[...currentUser?.following]
            following.splice(currentUser?.following.indexOf(id), 1)
            dispatch(updateUserThunk({...currentUser, following: following}))
            dispatch(updateLoggedInUserThunk({...currentUser, following: following}))


        }
    }

    const ShowProfile = ({user, showFollow}) => {
        return (
            <div className="col-4 p-2">
                <div className="card" >
                    {/*onClick={() => navigate('/profile/' + user.userName)}>*/}
                    <div className="d-flex flex-column align-items-center text-center mt-2">
                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png"
                             className="rounded-circle" width="50"/>
                        <div className="mt-3">
                            <h6>{user?.firstName} {user.lastName}</h6>
                            <p className="text-secondary mb-1" onClick={showFollow? null: () => navigate('/profile/' + user.userName)}>@{user.userName} </p>
                            {showFollow?
                            <button className="m-2 btn btn-primary" onClick={() => updateFollowing(user._id, true)}>Follow</button>:
                                <button className="m-2 btn btn-primary" onClick={() => updateFollowing(user._id, false)}>UnFollow</button>
                            }
                        </div>
                    </div>
                </div>
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
                                                <img src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                                     alt="Admin"
                                                     className="rounded-circle" width="150"/>
                                                <div className="mt-3">
                                                    <h4>{currentUser?.firstName} {currentUser?.lastName}</h4>
                                                    <p className="text-info fw-bolder mb-1">@{currentUser?.userName}</p>
                                                    {/*<button className="m-2 btn btn-primary">Follow</button>*/}
                                                    <button className="btn btn-primary">
                                                        {currentUser?.qaApproved ? "Question Admin" : currentUser?.qaRequested ? "Already Requested Question Admin" :
                                                            "Request Question Admin"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/*Followers Section*/}
                                    <div className="card mt-4">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <h6 className="mb-0">Followers</h6>
                                                </div>
                                                <div className="col-sm-6 text-info fw-bolder">
                                                    {currentUser?.followers.length}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/*Following Section*/}
                                    <div className="card mt-4">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <h6 className="mb-0">Following</h6>
                                                </div>
                                                <div className="col-sm-6 text-info fw-bolder">
                                                    {currentUser?.following.length}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/*Profile Liked Section*/}
                                    <div className="card mt-4">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <h6 className="mb-0">Likes</h6>
                                                </div>
                                                <div className="col-sm-6 text-info fw-bolder">
                                                    {currentUser?.liked ? currentUser?.liked.length : 0}
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
                                            <LineItems information={{title: "User Name", value: currentUser?.userName}}/>
                                            <hr/>
                                            <LineItems
                                                information={{title: "First Name", value: currentUser?.firstName}}/>
                                            <hr/>
                                            <LineItems information={{title: "Last Name", value: currentUser?.lastName}}/>
                                            <hr/>
                                            <LineItems information={{title: "Email", value: currentUser?.email}}/>
                                            <hr/>
                                            <LineItems information={{title: "DOB", value: currentUser?.dob}}/>
                                            <hr/>
                                            <LineItems information={{title: "Mobile", value: currentUser?.mobile}}/>
                                            <hr/>
                                            <LineItems information={{title: "Bio", value: currentUser?.additionalInfo}}/>
                                            <hr/>
                                            <div className="row">
                                                <div className="col-sm-12 text-center">
                                                    <button className="btn btn-secondary"
                                                       onClick= {()=>{navigate("/editProfile")}}>Edit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Follow More   */}
                            <div className="col-sm-12 mt-3 mb-3">
                                <div className="card h-100 " style={{background:"#f8f8f8"}}>
                                    <div className="card-body scroll">
                                        <h4 className="fw-bold  m-2 mb-4" style={{
                                            textDecoration: "underline",
                                            textDecorationColor: "#ffd200",
                                            textDecorationThickness: "4px"
                                        }}>
                                        Follow More</h4>
                                        <div className="row">
                                            {followMoreList.map((account, index)=>
                                            <ShowProfile user={account} showFollow={true}/>
                                            )}

                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Followers and Following Profiles  */}
                            <div class="row">
                                <div className="col-sm-6 mt-3 mb-3">
                                    <div className="card h-100 " style={{background:"#f8f8f8"}}>
                                        <div className="card-body scroll">
                                            <h4 className="fw-bold  m-2 mb-4" style={{
                                                textDecoration: "underline",
                                                textDecorationColor: "#ffd200",
                                                textDecorationThickness: "4px"
                                            }}>
                                                Following </h4>
                                            <div className="row">
                                                {followingList.map((account, index)=>
                                                    <ShowProfile user={account} showFollow={false}/>
                                                )}
                                            </div>
                                            <span class="text-center">{followingList.length==0? <h5> You are not following anyone!</h5>:<></>}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 mt-3 mb-3">
                                    <div className="card h-100 " style={{background:"#f8f8f8"}}>
                                        <div className="card-body scroll">
                                            <h4 className="fw-bold  m-2 mb-4" style={{
                                                textDecoration: "underline",
                                                textDecorationColor: "#ffd200",
                                                textDecorationThickness: "4px"
                                            }}>
                                                Followers</h4>
                                            <div className="row">
                                                {followersList.map((account, index)=>
                                                    <ShowProfile user={account} showFollow={false}/>
                                                )}
                                                <span className="text-center">{followersList.length == 0 ?
                                                    <h5> No one is following you!</h5> : <></>}</span>


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
    )
}

export default MyProfile