
const Stats =({
                  webStats = {
                      question: 0,
                      category: 0,
                      users: 0,
                      article: 0,
                  }
              }) =>{
    return (
        <section>

            <div className="container py-2 py-xl-3">
                <div className="row gy-4 row-cols-2 row-cols-md-4">
                    <div className="col">
                        <div className="text-center d-flex flex-column justify-content-center align-items-center py-3">
                            <div
                                className="bs-icon-xl bs-icon-circle bs-icon-primary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block mb-2 bs-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor"
                                     viewBox="0 0 16 16" className="bi bi-quora">
                                    <path
                                        d="M8.73 12.476c-.554-1.091-1.204-2.193-2.473-2.193-.242 0-.484.04-.707.142l-.43-.863c.525-.45 1.373-.808 2.464-.808 1.697 0 2.568.818 3.26 1.86.41-.89.605-2.093.605-3.584 0-3.724-1.165-5.636-3.885-5.636-2.68 0-3.839 1.912-3.839 5.636 0 3.704 1.159 5.596 3.84 5.596.425 0 .811-.046 1.166-.15Zm.665 1.3a7.127 7.127 0 0 1-1.83.244C3.994 14.02.5 11.172.5 7.03.5 2.849 3.995 0 7.564 0c3.63 0 7.09 2.828 7.09 7.03 0 2.337-1.09 4.236-2.675 5.464.512.767 1.04 1.277 1.773 1.277.802 0 1.125-.62 1.179-1.105h1.043c.061.647-.262 3.334-3.178 3.334-1.767 0-2.7-1.024-3.4-2.224Z"></path>
                                </svg>
                            </div>
                            <div className="px-3">
                                <h2 className="fw-bold mb-0"><span
                                    style={{backgroundColor: "ffd203"}}>{webStats.question}</span></h2>
                                <p className="mb-0">Questions</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="text-center d-flex flex-column justify-content-center align-items-center py-3">
                            <div
                                className="bs-icon-xl bs-icon-circle bs-icon-primary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block mb-2 bs-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
                                     strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
                                     strokeLinejoin="round" className="icon icon-tabler icon-tabler-menu-2">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <line x1="4" y1="6" x2="20" y2="6"></line>
                                    <line x1="4" y1="12" x2="20" y2="12"></line>
                                    <line x1="4" y1="18" x2="20" y2="18"></line>
                                </svg>
                            </div>
                            <div className="px-3">
                                <h2 className="fw-bold mb-0"><span style={{backgroundColor: "ffd203"}}>{webStats.category}</span>
                                </h2>
                                <p className="mb-0">Categories</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="text-center d-flex flex-column justify-content-center align-items-center py-3">
                            <div
                                className="bs-icon-xl bs-icon-circle bs-icon-primary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block mb-2 bs-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-32 0 512 512" width="1em" height="1em"
                                     fill="currentColor">
                                    <path
                                        d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"></path>
                                </svg>
                            </div>
                            <div className="px-3">
                                <h2 className="fw-bold mb-0"><span
                                    style={{backgroundColor: "ffd203"}}>{webStats.users}</span></h2>
                                <p className="mb-0">Users</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="text-center d-flex flex-column justify-content-center align-items-center py-3">
                            <div
                                className="bs-icon-xl bs-icon-circle bs-icon-primary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block mb-2 bs-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor"
                                     viewBox="0 0 16 16" className="bi bi-bookmark-fill">
                                    <path
                                        d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"></path>
                                </svg>
                            </div>
                            <div className="px-3">
                                <h2 className="fw-bold mb-0"><span
                                    style={{backgroundColor: "ffd203"}}>{webStats.article}</span></h2>
                                <p className="mb-0">Articles</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Stats