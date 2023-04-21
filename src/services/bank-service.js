import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_BASE||'http://localhost:4000/api';
const USER_API = `${API_BASE}/question`;

export const createQuestion = async (question) => {
    const response = await axios.post(USER_API, question)
    return response.data;
}

export const findAllQuestions = async () => {
    const response = await axios.get(USER_API);
    const questions = response.data;
    return questions;
}

export const findQuestionsByCategory = async (category) => {
    const response = await axios.get(`${USER_API}/${category}`);
    const questions = response.data;
    return questions;
}

export const deleteQuestion = async (qid) => {
    const response = await axios
        .delete(`${USER_API}/${qid}`)
    return response.data
}
