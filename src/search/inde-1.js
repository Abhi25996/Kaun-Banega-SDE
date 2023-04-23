import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateFetchedArticles} from "../reducer/articles"
import {
    createArticleThunk,
    fetchAllArticles,
    findAllArticleThunk,
    updateArticleThunk
} from "../services/article-thunks";
import {useNavigate} from "react-router-dom";

const Search = () =>{
    const dispatch = useDispatch()
    const [search, setSearch] = useState("");
    const [fetchedArticles, setFetchedArticles] = useState([]);
    const [processedArticles, setProcessedArticles] = useState([]);
    const {articles, loading, searchArticles, loadingSearch} = useSelector(
        state => state.articles)
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(findAllArticleThunk());
    }, [])

    function ProcessArticles(){
        let process = []
        console.log("Fetched Articls : ",fetchedArticles.length )
        for(let i=0; i< fetchedArticles.length; i++){
            let found=false
            for(let j=0; j<articles.length;j++){
                if(fetchedArticles[i].url == articles[j].url) {
                    process.push(articles[j])
                    found=true;
                }
            }
            if(!found) process.push(fetchedArticles[i])
        }
        console.log("PROCESS",process)
        setFetchedArticles([...process])

    }
    const HandleOpeningArticle = (article)=>{
        const findArticle = articles.filter(art => art.url == article.url)
        if(findArticle.length==0) {
            const payload = {
                author: article.author,
                title: article.title,
                description: article.description,
                url: article.url,
                urlToImage: article.urlToImage,
                views: 1,
                likes: [],
                dislikes: [],
            }
            dispatch(createArticleThunk(payload))
        }
        else{
            const payload = {
                ...findArticle[0],
                views: findArticle[0].views+1
            }
            dispatch(updateArticleThunk(payload))
        }
        window.open(article.url,"_blank")
    }

    const SearchComponent = ({article})=>{
        return(
            <div className="col mb-4">
            <div className="card pb-5" style={{height:"600px", overflow:"hidden"}}>
                <img className="card-img-top w-100 d-block fit-cover"
                                       src={article.urlToImage} style={{height:"200px"}} onClick={()=>HandleOpeningArticle(article)}/>
                <div className="card-body p-4">
                    <h4 className="font-weight-bold card-title">{article.title}</h4>
                    <p className="card-text">{article.description}</p>
                    <div className="d-flex">
                        <img className="rounded-circle flex-shrink-0 mr-3 fit-cover" width="50"
                             height="50"
                             src="./assets/img/author.png"/>
                        <div>
                            <p className="font-weight-bold mb-0">{article.author}</p>
                        </div>
                    </div>
                    <hr/>
                    {article?.likes==undefined?<></>:
                        <div className="row align-items-center">
                            <div className="col-4">
                                <i className="fa fa-heart pe-2" style={{color:"red"}}/>
                                <span>{article.likes.length}</span>
                            </div>
                            <div className="col-4">
                                <i className="fa fa-eye pe-2"></i>
                                <span>{article.views}</span>
                            </div>
                            <div className="col-4">
                                <i className="fa fa-thumbs-down pe-2"></i>
                                <span>{article.dislikes.length}</span>
                            </div>
                        </div> }
                </div>
            </div>
            </div>
        )
    }



    return(
        <div className="pt-5">
            <section className="py-4 py-md-5 my-5">
                <div className="container py-md-5">
                    <form className="search-form">
                        <div className="row">
                            <div className="input-group"><span className="input-group-text"><i
                                className="fa fa-search"></i></span><input className="form-control" type="text"
                                                                           value = {search} onChange={(event)=>setSearch(event.target.value)}
                                                                           placeholder="I am looking for.."/>
                                <button className="btn btn-light" type="button" onClick = {()=>{
                                    dispatch(fetchAllArticles(search))
                                    console.log("S",searchArticles.articles)
                                    // Object.keys(searchArticles).length>0&& setFetchedArticles(searchArticles.articles.slice(0,15))
                                    ProcessArticles()
                                } }>Search</button></div>
                        </div>
                    </form>
                </div>
            </section>
            <div className="container py-4 py-xl-5">
                <div className="row mb-5 py-md-5">
                    <div className="col-md-8 col-xl-6 text-center mx-auto">
                        <h2 className="font-weight-bold">Articles</h2>
                        <p>Here are the curated picks for you!</p>
                    </div>
                </div>
                <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3">
                    {
                        processedArticles.map(art => <SearchComponent article={art} />)
                    }
                </div>
            </div>
        </div>
    )

}

export default Search