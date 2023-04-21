import {createAsyncThunk}
    from "@reduxjs/toolkit"
import * as service
    from "./user-service"

export const loginThunk = createAsyncThunk(
    "users/login", async (credentials) => {
        const user = await service.loginUser(credentials);
        return user;
    }
);

export const registerThunk = createAsyncThunk(
    "users/register", async (userInformation) => {
        const user = await service.registerUser(userInformation);
        return user;
    }
);

export const findAllUsersThunk = createAsyncThunk(
    'users/findUsers', async () =>
        await service.findAllUsers()
)

export const findUserByIdThunk = createAsyncThunk(
    'users/findUser', async (userId) =>
        await service.findUserById(userId)
)

export const deleteUserThunk = createAsyncThunk(
    'users/deleteUser',
    async (userId) => {
        await service.deleteUser(userId)
        return userId
    })



export const updateUserThunk =
    createAsyncThunk(
        'users/updateUser',
        async (userInfo) =>
            await service.updateUser(userInfo)
    )

export const updateLoggedInUserThunk =
    createAsyncThunk(
        'users/updateUserLogIN',
        async (userInfo) =>
            await service.updateUser(userInfo)
    )