import { createSlice } from "@reduxjs/toolkit";
import {createQuestionThunk, deleteQuestionThunk, findAllQuestionsThunk} from "../services/bank-thunks";

const initialState = {
    questions: [],
    loadingBank: false
}

const questionSlice = createSlice({
    name: 'bank',
    initialState,
    extraReducers: {
        [findAllQuestionsThunk.pending]:
            (state) => {
                state.loadingBank = true
                state.questions = []
            },
        [findAllQuestionsThunk.fulfilled]:
            (state, { payload }) => {
                state.loadingBank = false
                state.questions = payload
            },
        [findAllQuestionsThunk.rejected]:
            (state, action) => {
                state.loadingBank = false
                state.error = action.error
            },
        [deleteQuestionThunk.fulfilled] :
            (state, { payload }) => {
                state.loadingBank = false
                state.questions = state.questions
                    .filter(u => u._id !== payload)
            },
        [createQuestionThunk.fulfilled]:
            (state, { payload }) => {
                state.loadingBank = false
                state.questions.push(payload)
            },
    },
    reducers: { }
});
export default questionSlice.reducer;