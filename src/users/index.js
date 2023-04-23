import {useSelector} from "react-redux";
import "./index.css"
import {useNavigate} from "react-router-dom";

const UserGrid = () =>{
    const {users} = useSelector(
        state => state.users)
    const navigate = useNavigate();
    return (
        <header className="pt-5">
            <div className="container pt-4 pt-xl-5">
                <div className="row pt-5">
                    <div className="col-md-12 text-center text-md-start mx-auto">
                        <div className="text-center">
                            <h1 className="display-4 fw-bold mb-5">View &nbsp;<span className="underline">Users</span>.
                            </h1>
                            <p className="fs-5 text-muted mb-5">Peek into all the users</p>
                            <form className="d-flex justify-content-center flex-wrap" method="post">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th>User Name</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>No of Followers</th>
                                            <th>No of Following</th>
                                            <th>Total Score</th>
                                            <th>Show Profile</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            users.map(
                                                user => <tr>
                                                    <td>{user.userName}</td>
                                                    <td>{user.firstName}</td>
                                                    <td>{user.lastName}</td>
                                                    <td>{user.followers.length}</td>
                                                    <td>{user.following.length}</td>
                                                    <td>{user.totalScore}</td>
                                                    <td>
                                                        <a className="btn btn-secondary shadow text-dark " style={{padding:"5px", minWidth: "50%", maxWidth:"100%"}} onClick={()=>navigate("/profile/"+user.userName)}role="button"> Show</a>
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


export default UserGrid