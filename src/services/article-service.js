import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_BASE||'http://localhost:4000/api';
const ARTICLE_API = `${API_BASE}/articles`;


export const getSearchArticles = async (query) => {
    let q = query.replaceAll(" ","+")
    console.log("ARTICLE URL : ", "https://newsapi.org/v2/everything?q="+q+"&from=2023-03-23&sortBy=publishedAt&apiKey=8e5deae9a31144f08b1fe70f10832c95")
    const response = await axios.get("https://newsapi.org/v2/everything?q="+q+"&from=2023-03-23&sortBy=publishedAt&apiKey=8e5deae9a31144f08b1fe70f10832c95")
    console.log("RESPONSE ARTICLE : ", response.data)
    return response.data;
}

export const createArticle = async (article) => {
    const response = await axios.post(ARTICLE_API, article)
    return response.data;
}

export const findAllArticles = async () => {
    const response = await axios.get(ARTICLE_API);
    const articles = response.data;
    return articles;
}

export const updateArticle = async (articleInformation) => {
    const response = await axios
        .put(`${ARTICLE_API}/${articleInformation._id}`, articleInformation);
    return articleInformation;
}
