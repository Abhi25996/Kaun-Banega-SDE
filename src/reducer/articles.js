import { createSlice } from "@reduxjs/toolkit";
import {
    createArticleThunk,
    fetchAllArticles,
    findAllArticleThunk,
    updateArticleThunk
} from "../services/article-thunks";

const articleSlice = createSlice({
    name: "articles",
    initialState: { articles : [], loading: false, searchArticles : {}, loadingSearch:0 },
    reducers: {
        updateFetchedArticles(state, action) {
            console.log("Reducer: ", action.payload)
            state.searchArticles = action.payload
            state.loadingSearch = 2
        },
        reinitFetchedArticles(state) {
            state.searchArticles = {}
            state.loadingSearch = 0
        },
    },
    extraReducers: {
        [findAllArticleThunk.pending]:
            (state) => {
                state.loading = true
                state.articles = []
            },
        [findAllArticleThunk.fulfilled]:
            (state, { payload }) => {
                state.loading = false
                state.articles = payload
            },
        [findAllArticleThunk.rejected]:
            (state, action) => {
                state.loading = false
                state.error = action.error
            },
        [createArticleThunk.fulfilled]:
            (state, { payload }) => {
                state.loading = false
                state.articles.push(payload)
                for(let i=0; i<state.searchArticles.articles.length; i++){
                    if(state.searchArticles.articles[i].url==payload.url)  state.searchArticles.articles[i]=payload
                }
            },
        [updateArticleThunk.fulfilled]:
            (state, { payload }) => {
                state.loading = false
                const articleIndex = state.articles
                    .findIndex((a) => a._id === payload._id)
                state.articles[articleIndex] = {
                    ...state.articles[articleIndex],
                    ...payload
                }
                for(let i=0; i<state.searchArticles.articles.length; i++){
                    if(state.searchArticles.articles[i].url==payload.url)  state.searchArticles.articles[i]=payload
                }

            },
        [fetchAllArticles.fulfilled]:
            (state, { payload }) => {
            state.loadingSearch = 1
            state.searchArticles = payload
        }
    }
});

export const {updateFetchedArticles, reinitFetchedArticles} = articleSlice.actions
export default articleSlice.reducer;