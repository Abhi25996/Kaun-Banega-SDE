import {useNavigate} from "react-router-dom";

const Signup =()=>{
    const navigate = useNavigate();
    return(
        <section className="py-2 py-xl-3">
            <div className="container">
                <div
                    className="text-white bg-primary border rounded border-0 border-primary d-flex flex-column justify-content-between flex-lg-row p-4 p-md-5">
                    <div className="pb-2 pb-lg-1">
                        <h2 className="fw-bold text-warning mb-2">What are you waiting for?</h2>
                        <p className="mb-0">Register yourself now to get started!</p>
                    </div>
                    <div className="my-2"><a className="btn btn-light fs-5 py-2 px-4" role="button" onClick={()=>navigate("/signup")}>Sign Up</a></div>
                </div>
            </div>
        </section>
    )
}
export default Signup