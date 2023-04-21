const LeaderBoard = ({members}) => {
    // eslint-disable-next-line no-unused-expressions
    members = members.slice(0,members.length>5? 5: members.length);
    // TODO: Add this dynamically
    const Members = (member) =>{
        return (
            <tr>
                <th><span style={{color: "white"}}>{member.member.userName}</span></th>
                <th><span style={{color: "white"}}>{member.member.totalScore}</span></th>
            </tr>
        )
    };
    return (
        <section className="py-4 py-xl-5">
            <div className="container">
                <div className="bg-primary border rounded border-0 border-primary overflow-hidden">
                    <div className="row g-0">
                        <div className="col-md-6 d-flex flex-column justify-content-center">
                            <div className="text-white p-4 p-md-5">
                                <h2 className="fw-bold text-white mb-3">
                                    <span style={{color: "#ffd21f"}}>FRONT BENCHERS</span></h2>
                                <div className="my-3">
                                    <div className="table-responsive">
                                        <table className="table">

                                            <tbody>
                                            {
                                                members.map((mem, index) =>
                                                        <Members key={index} member={mem}/>
                                                )
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 order-first order-md-last" style={{minHeight: "250px"}}><img
                            className="w-100 h-100 fit-contain pt-5 pt-md-0" src="assets/img/leader-board.png"/></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LeaderBoard