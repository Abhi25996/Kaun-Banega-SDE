import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {reinitFetchedArticles, updateFetchedArticles} from "../reducer/articles"
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

    const {articles,searchArticles, loadingSearch} = useSelector(
        state => state.articles)
    const {currentUser} = useSelector(
        state => state.auth)
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(findAllArticleThunk());
    }, [])
    console.log("Loading ", loadingSearch)
    console.log("Search : ", search)

    const UpdateLike = (article)=>{
        if(!currentUser) alert("Please Login to like the Article")
        else{
            if(article.likes.includes(currentUser._id)) {
                let likeList = article.likes.filter(id=> id!=currentUser._id)
                dispatch(updateArticleThunk({...article, likes:[...likeList]}))
            }
            else dispatch(updateArticleThunk({...article, likes:[...article.likes, currentUser._id]}))
        }

    }

    const UpdateDisLike = (article)=>{
        if(!currentUser) alert("Please Login to Unlike the Article")
        else{
            dispatch(updateArticleThunk({...article, dislikes:[...article.dislikes, currentUser._id]}))
            if(article.dislikes.includes(currentUser._id)) {
                let dislikeList = article.dislikes.filter(id=> id!=currentUser._id)
                dispatch(updateArticleThunk({...article, dislikes:[...dislikeList]}))
            }
            else dispatch(updateArticleThunk({...article, dislikes:[...article.dislikes, currentUser._id]}))
        }
    }

    function ProcessArticles(){
        let process = []
        let size = searchArticles.articles > 18 ? 18 : searchArticles.articles.length
        for(let i=0; i< size; i++){
            let found=false
            for(let j=0; j<articles.length;j++){
                if(searchArticles.articles[i].url == articles[j].url) {
                    process.push(articles[j])
                    found=true;
                }
            }
            if(!found) process.push(searchArticles.articles[i])
        }
        console.log("PROCESS",process)
        dispatch(updateFetchedArticles({articles: [...process]}))

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
            <div className="col ">
                <div className="card pb-5" style={{height:"600px", overflow:"hidden"}}>
                    <img className="card-img-top w-100 d-block "
                         src={article.urlToImage} style={{height:"170px"}} onClick={()=>HandleOpeningArticle(article)}/>
                    <div className="card-body p-4">
                        <div style={{height:"250px", overflow:"hidden"}}>
                        <h4 className="font-weight-bold card-title">{article.title}</h4>
                        <p className="card-text">{article.description}</p>
                        </div>
                        <hr/>
                        <div className="d-flex p-2" style={{height:"50px"}}>
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
                                    <i className="fa fa-heart pe-2" style={{color:article.likes.includes(currentUser?._id)?"red":"gray"}} onClick={()=>UpdateLike(article)}/>
                                    <span>{article.likes.length}</span>
                                </div>
                                <div className="col-4">
                                    <i className="fa fa-eye pe-2"></i>
                                    <span>{article.views}</span>
                                </div>
                                <div className="col-4">
                                    <i className="fa fa-thumbs-down pe-2" style={{color:article.dislikes.includes(currentUser?._id)?"blue":"gray"}} onClick={()=>UpdateDisLike(article)} ></i>
                                    <span>{article.dislikes.length}</span>
                                </div>
                            </div> }
                    </div>
                </div>
            </div>
        )
    }

    const onChangeSearchBar = (event)=>{
        if(search.length==0) dispatch(reinitFetchedArticles())
        setSearch(event.target.value)
    }


    return(
        <>
            {loadingSearch==0?
                <div className="pt-5">
                    <section className="py-4 py-md-5 my-5" >
                        <div className="container py-md-5">
                            <form className="search-form">
                                <div className="row">
                                    <div className="input-group"><span className="input-group-text"><i
                                        className="fa fa-search"></i></span><input className="form-control" type="text"
                                                                                   value = {search} onChange={(event)=>onChangeSearchBar(event)}
                                                                                   placeholder="I am looking for.."/>
                                        <button className="btn btn-light" type="button" onClick = {()=>{
                                            dispatch(fetchAllArticles(search))
                                        } }>Search</button></div>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
        : loadingSearch==1?
                <div>
                    {dispatch(updateFetchedArticles({articles: searchArticles.articles.slice(0,16) }))}
                    {ProcessArticles()}
                </div>
                    :
                    <>
                        <div>
                            <section className="pt-5">
                                <div className="container py-md-5">
                                    <form className="search-form">
                                        <div className="row">
                                            <div className="input-group"><span className="input-group-text"><i
                                                className="fa fa-search"></i></span><input className="form-control" type="text"
                                                                                           value = {search} onChange={(event)=>onChangeSearchBar(event)}
                                                                                           placeholder="I am looking for.."/>
                                                <button className="btn btn-light" type="button" onClick = {()=>{
                                                    dispatch(fetchAllArticles(search))
                                                } }>Search</button></div>
                                        </div>
                                    </form>
                                </div>
                            </section>
                        </div>
                    <div className="container py-1py-xl-2">
                        <div className="">
                            <div className="col-md-8 col-xl-6 text-center mx-auto">
                                <h2 className="font-weight-bold">Articles</h2>
                                <p>Here are the curated picks for you!</p>
                            </div>
                        </div>
                        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3">
                            {
                                searchArticles.articles.map(art => <SearchComponent article={art} />)
                            }
                        </div>
                    </div>
                        </>
            }</>
            )

}

export default Search

