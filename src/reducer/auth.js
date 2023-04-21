import { createSlice } from "@reduxjs/toolkit";
import {loginThunk, registerThunk, updateLoggedInUserThunk} from "../services/user-thunks";


const authSlice = createSlice({
    name: "auth",
    initialState: { currentUser: null },
    reducers: {},
    extraReducers: {
        [loginThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
        },
        [registerThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
        },
        [updateLoggedInUserThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
        },

    },
});
export default authSlice.reducer;