import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_BASE||'http://localhost:4000/api';
const USER_API = `${API_BASE}/users`;
const API = axios.create({ withCredentials: true });


export const loginUser = async ({ username, password }) => {
    const response = await API.post(`${USER_API}/login`, {
        userName: username,
        password: password,
    });
    const user = response.data;
    return user;
};

export const registerUser = async (newUser) => {
    const response = await API.post(`${USER_API}/register`, newUser);
    const user = response.data;
    return user;
};

export const createUser = async (userInfo) => {
    const response = await axios.post(USER_API, userInfo)
    return response.data;
}

export const findAllUsers = async () => {
    const response = await axios.get(USER_API);
    const users = response.data;
    return users;
}

export const findUserById = async (uid) => {
    const response = await axios.get(`${USER_API}/${uid}`);
    const user = response.data;
    return user;
}

export const deleteUser = async (uid) => {
    const response = await axios
        .delete(`${USER_API}/${uid}`)
    return response.data
}

export const updateUser = async (userInfo) => {
    const response = await axios
        .put(`${USER_API}/${userInfo._id}`, userInfo);
    return userInfo;
}

export const logout = async () => {
    const response = await API.post(`${USER_API}/logout`);
    console.log("LOGGED OUT ", response)
    return response.data;
};

