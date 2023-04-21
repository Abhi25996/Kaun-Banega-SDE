import { createSlice } from "@reduxjs/toolkit";
import {
    deleteUserThunk,
    findAllUsersThunk, registerThunk,
    updateUserThunk
} from "../services/user-thunks";

const initialState = {
    users: [],
    loading: false
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers: {
        [findAllUsersThunk.pending]:
            (state) => {
                state.loading = true
                state.users = []
            },
        [findAllUsersThunk.fulfilled]:
            (state, { payload }) => {
                state.loading = false
                state.users = payload
            },
        [findAllUsersThunk.rejected]:
            (state, action) => {
                state.loading = false
                state.error = action.error
            },
        [deleteUserThunk.fulfilled] :
            (state, { payload }) => {
                state.loading = false
                state.users = state.users
                    .filter(u => u._id !== payload)
            },
        [registerThunk.fulfilled]:
            (state, { payload }) => {
                state.loading = false
                state.users.push(payload)
            },
        [updateUserThunk.fulfilled]:
            (state, { payload }) => {
                state.loading = false
                const userIndex = state.users
                    .findIndex((u) => u._id === payload._id)
                state.users[userIndex] = {
                    ...state.users[userIndex],
                    ...payload
                }
                console.log(state.users[userIndex])
            }
    },
    reducers: { }
});
export default usersSlice.reducer;