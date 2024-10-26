const USER_REGISTRATION = `${process.env.REACT_APP_API_URL}/user/register`;
const USER_LOGIN = `${process.env.REACT_APP_API_URL}/user/login`;
const GET_BOOK = `${process.env.REACT_APP_API_URL}/books/get`;
const ADD_BOOK = `${process.env.REACT_APP_API_URL}/books/add`;
const UPDATE_BOOK = `${process.env.REACT_APP_API_URL}/books/update`;
const DELETE_BOOK = `${process.env.REACT_APP_API_URL}/books/delete`;

module.exports = {
    USER_REGISTRATION, USER_LOGIN, GET_BOOK, ADD_BOOK, UPDATE_BOOK, DELETE_BOOK
}