import {useLocation} from "react-router";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const ShowUserProfile = () =>{
    const {pathname} = useLocation();
    const paths = pathname.split('/')
    const username = paths[paths.length-1];
    const {users} = useSelector(
        state => state.users)
    let userProfile = users.filter(user => user.userName == username)
    console.log("USER PROFILE : ", userProfile)
    const navigate = useNavigate();
    if (!userProfile) navigate("/")
    userProfile = userProfile[0]
    const followingList = users.filter(user => (userProfile?.following.includes(user?._id)))
    const followersList = users.filter(user => (userProfile?.followers.includes(user?._id)))
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
    const ShowProfile = ({user}) =>{
        return(<div className="col-4 p-2">
            <div className="card" >
                {/*onClick={() => navigate('/profile/' + user.userName)}>*/}
                <div className="d-flex flex-column align-items-center text-center mt-2">
                    <img src={`../assets/img/icons/${user?.iconPath}`}
                         className="rounded-circle" width="50"/>
                    <div className="mt-3">
                        <h6>{user?.firstName} {user.lastName}</h6>
                        <p className="text-secondary mb-1" onClick={() => navigate('/profile/' + user.userName)}>@{user.userName} </p>
                    </div>
                </div>
            </div>
        </div>)
    }
    console.log("CURRENT profile  : ", userProfile)
    return(
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
                                                <img src={`../assets/img/icons/${userProfile?.iconPath}`}
                                                     alt="Admin"
                                                     className="rounded-circle" width="150"/>
                                                <div className="mt-3">
                                                    <h4>{userProfile?.firstName} {userProfile?.lastName}</h4>
                                                    <p className="text-info fw-bolder mb-1">@{userProfile?.userName}</p>
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
                                                    {userProfile?.followers.length}
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
                                                    {userProfile?.following.length}
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
                                            <LineItems
                                                information={{title: "User Name", value: userProfile?.userName}}/>
                                            <hr/>
                                            <LineItems
                                                information={{title: "First Name", value: userProfile?.firstName}}/>
                                            <hr/>
                                            <LineItems
                                                information={{title: "Last Name", value: userProfile?.lastName}}/>
                                            <hr/>
                                            <LineItems information={{title: "Email", value: userProfile?.email}}/>
                                            <hr/>
                                            <LineItems
                                                information={{title: "Bio", value: userProfile?.additionalInfo}}/>

                                        </div>
                                    </div>
                                </div>
                            </div>



                            {/* Followers and Following Profiles  */}
                            <div className="row">
                                <div className="col-sm-6 mt-3 mb-3">
                                    <div className="card h-100 " style={{background: "#f8f8f8"}}>
                                        <div className="card-body scroll">
                                            <h4 className="fw-bold  m-2 mb-4" style={{
                                                textDecoration: "underline",
                                                textDecorationColor: "#ffd200",
                                                textDecorationThickness: "4px"
                                            }}>
                                                Following </h4>
                                            <div className="row">
                                                {followingList.map((account, index) =>
                                                    <ShowProfile user={account} showFollow={false}/>
                                                )}
                                            </div>
                                            <span className="text-center">{followingList.length == 0 ?
                                                <h5> User is not following anyone!</h5> : <></>}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 mt-3 mb-3">
                                    <div className="card h-100 " style={{background: "#f8f8f8"}}>
                                        <div className="card-body scroll">
                                            <h4 className="fw-bold  m-2 mb-4" style={{
                                                textDecoration: "underline",
                                                textDecorationColor: "#ffd200",
                                                textDecorationThickness: "4px"
                                            }}>
                                                Followers</h4>
                                            <div className="row">
                                                {followersList.map((account, index) =>
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
export default ShowUserProfile