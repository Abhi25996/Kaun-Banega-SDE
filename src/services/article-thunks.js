import {createAsyncThunk}
    from "@reduxjs/toolkit"
import * as service
    from "./article-service"

export const fetchAllArticles = createAsyncThunk(
    'articles/fetchArticles', async (searchQuery) =>
        await service.getSearchArticles(searchQuery)
)

export const findAllArticleThunk = createAsyncThunk(
    'articles/findArticles', async () =>
        await service.findAllArticles()
)

export const createArticleThunk = createAsyncThunk(
    'articles/createArticle',
    async (articleInformation) => {
        const newArticle = await service.createArticle(articleInformation)
        return newArticle
})

export const updateArticleThunk = createAsyncThunk(
        'articles/updateArticle',
        async (articleInformation) =>
            await service.updateArticle(articleInformation)
    )
