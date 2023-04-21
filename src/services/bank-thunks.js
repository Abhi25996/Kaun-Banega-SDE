import {createAsyncThunk}
    from "@reduxjs/toolkit"
import * as service
    from "./bank-service"

export const findAllQuestionsThunk = createAsyncThunk(
    'question/findQuestions', async () =>
        await service.findAllQuestions()
)

export const findQuestionByCategoryThunk = createAsyncThunk(
    'users/findQuestionByCategory', async (category) =>
        await service.findQuestionsByCategory(category)
)

export const deleteQuestionThunk = createAsyncThunk(
    'users/deleteQuestion',
    async (questionId) => {
        await service.deleteQuestion(questionId)
        return questionId
    })

export const createQuestionThunk = createAsyncThunk(
    'users/createQuestion',
    async (questionInfo) => {
        const newQuestion = await service.createQuestion(questionInfo)
        return newQuestion
})
