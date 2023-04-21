const FAQ = ()=>{
    return (
        <section className="py-2 py-xl-3">
            <div className="container">
                <div className="row mb-2">
                    <div className="col-md-8 col-xl-6 text-center mx-auto">
                        <h2 className="display-6 fw-bold mb-5"><span className="pb-3 underline">FAQ<br/></span></h2>
                        <p className="text-muted mb-5">The only time we answer your questions!</p>
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-md-8 mx-auto">
                        <div className="accordion text-muted" role="tablist" id="accordion-1">
                            <div className="accordion-item">
                                <h2 className="accordion-header" role="tab">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#accordion-1 .item-1" aria-expanded="true"
                                            aria-controls="accordion-1 .item-1">What is a software engineer quiz web
                                        app?
                                    </button>
                                </h2>
                                <div className="accordion-collapse collapse show item-1" role="tabpanel"
                                     data-bs-parent="#accordion-1">
                                    <div className="accordion-body">
                                        <p>The web app presents a series of questions related to various topics in
                                            software engineering, such as programming languages, algorithms, data
                                            structures, and software design. Users can answer the questions and get
                                            instant feedback on their performance.</p>
                                        <p className="mb-0"></p>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" role="tab">
                                    <button className="accordion-button collapsed" type="button"
                                            data-bs-toggle="collapse" data-bs-target="#accordion-1 .item-2"
                                            aria-expanded="false" aria-controls="accordion-1 .item-2">Who can benefit
                                        from using a software engineer quiz web app?
                                    </button>
                                </h2>
                                <div className="accordion-collapse collapse item-2" role="tabpanel"
                                     data-bs-parent="#accordion-1">
                                    <div className="accordion-body">
                                        <p className="mb-0">Anyone who is interested in improving their knowledge of
                                            software engineering can benefit from using a software engineer quiz web
                                            app, including students, professionals, and hobbyists.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" role="tab">
                                    <button className="accordion-button collapsed" type="button"
                                            data-bs-toggle="collapse" data-bs-target="#accordion-1 .item-3"
                                            aria-expanded="false" aria-controls="accordion-1 .item-3">What are the
                                        benefits of using a software engineer quiz web app?
                                    </button>
                                </h2>
                                <div className="accordion-collapse collapse item-3" role="tabpanel"
                                     data-bs-parent="#accordion-1">
                                    <div className="accordion-body">
                                        <p className="mb-0">Using a software engineer quiz web app can help users
                                            identify areas where they need to improve their knowledge, reinforce their
                                            understanding of core concepts, and prepare for interviews or certification
                                            exams.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default FAQ