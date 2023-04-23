import {useDispatch, useSelector} from "react-redux";
import "./index.css"
import {useNavigate} from "react-router-dom";
import {deleteUserThunk, updateUserThunk} from "../services/user-thunks";

const Manage = () =>{
    const {users} = useSelector(
        state => state.users)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const filteredUser = users.filter(user => user.role !=="Admin")

    const removeUserFollowsFollowing = (userId) =>{
        console.log("USERID : ", userId)
        filteredUser.map(user => {
            let follower = [...user.followers]
            if (follower.includes(userId)){
                follower.splice(follower.indexOf(userId),1)
            }
            let following = [...user.following]
            if (following.includes(userId)){
                following.splice(follower.indexOf(userId),1)
            }
            console.log("FOLLOWS : ", follower)
            console.log("Following : ", following)
            dispatch(updateUserThunk({...user, following: following, followers : follower}))
        })
        dispatch(deleteUserThunk(userId))

    }


    return (
        <header className="pt-5">
            <div className="container pt-4 pt-xl-5">
                <div className="row pt-5">
                    <div className="col-md-12 text-center text-md-start mx-auto">
                        <div className="text-center">
                            <h1 className="display-4 fw-bold mb-5">Manage&nbsp;<span className="underline">Users</span>.
                            </h1>
                            <p className="fs-5 text-muted mb-5">Manage different user authorizations</p>
                            <form className="d-flex justify-content-center flex-wrap" method="post">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th>User Name</th>

                                            <th>QuizAdmin Requested</th>
                                            <th>QuizAdmin Approved</th>
                                            <th>Remove User</th>
                                            <th>Show Profile</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            filteredUser.map(
                                                user => <tr>
                                                            <td>{user.userName}</td>

                                                    <td><label className="switch">
                                                        {user?.qaRequested? <input type="checkbox" checked/>: <input type="checkbox" disabled/> }
                                                        <span className="slider round"></span>
                                                    </label></td>
                                                    <td><label className="switch">
                                                        {user?.qaRequested? <input type="checkbox" checked={user.qaApproved? true: null} id={user.userName} onChange = {(event)=> dispatch(updateUserThunk({...user, qaApproved: event.target.checked, role: event.target.checked? "Question-Admin":"User"}))}/>: <input type="checkbox" disabled/>  }
                                                        <span className="slider round"></span>
                                                    </label></td>
                                                    <td>
                                                        <a className="btn btn-danger shadow text-light" style={{padding:"5px", minWidth: "50%", maxWidth:"100%"}} onClick={()=>removeUserFollowsFollowing(user._id)} role="button"> Remove</a>
                                                    </td>
                                                    <td>
                                                        <a className="btn btn-secondary shadow text-dark " style={{padding:"5px", minWidth: "50%", maxWidth:"100%"}} onClick={()=>navigate("/profile/"+user.userName)} role="button"> Show</a>
                                                    </td>
                                                </tr>



                                            )
                                        }

                                        </tbody>
                                    </table>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}


export default Manage