const UserStats = ({user}) =>{
    let topic = "Not Started";
    let maxKey, maxValue = 0;

    for(const [key, value] of Object.entries(user.segregation)) {
        if(value > maxValue) {
            maxValue = value;
            maxKey = key;
        }
    }
    if (maxValue>0) topic = maxKey;



    return (
        <div className="container py-2 py-xl-3">
            <div className="row gy-4 gy-md-0">
                <div
                    className="col-md-6 text-center text-md-start d-flex d-sm-flex d-md-flex justify-content-center align-items-center justify-content-md-start align-items-md-center justify-content-xl-center">
                    <div><img className="rounded img-fluid fit-cover" style={{minHeight: "300px"}}
                              src="assets/img/keep-going.png"
                              width="800"/></div>
                </div>
                <div className="col">
                    <div style={{maxWidth: "450px"}}>
                        <h3 className="fw-bold pb-md-4" style={{textAlign: "center"}}>Where do you&nbsp;<span
                            className="underline">Stand?</span></h3>
                        <p className="text-muted py-4 py-md-0" style={{textAlign: "center", fontSize: "20px"}}>Check
                            your stats</p>
                        <div className="row gy-4 row-cols-2 row-cols-md-2">
                            <div className="col">
                                <div><span className="fs-2 fw-bold text-primary bg-warning"
                                           style={{textAlign: "center"}}>{user.answered}</span>
                                    <p className="fw-normal text-muted" style={{textAlign:"left"}}>Questions
                                        answered</p>
                                </div>
                            </div>
                            <div className="col">
                                <div><span className="fs-2 fw-bold text-primary bg-warning">{user.unanswered}</span>
                                    <p className="fw-normal text-muted" style={{textAlign:"left"}}>Questions Yet to
                                        be Answered</p>
                                </div>
                            </div>
                            <div className="col">
                                <div><span className="fs-2 fw-bold text-primary bg-warning">{user.score}</span>
                                    <p className="fw-normal text-muted" style={{textAlign:"left"}}> Score</p>
                                </div>
                            </div>
                            <div className="col">
                                <div><span className="fs-2 fw-bold text-primary bg-warning">{topic}</span>
                                    <p className="fw-normal text-muted" style={{textAlign:"left"}}>Most Viewed
                                        Topic</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserStats