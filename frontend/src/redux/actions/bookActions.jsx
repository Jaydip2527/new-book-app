import axios from 'axios';
import { ADD_ITEM, GET_ITEMS, DELETE_ITEM, UPDATE_ITEM } from '../types/bookTypes';
import { ADD_BOOK, DELETE_BOOK, GET_BOOK, UPDATE_BOOK, USER_LOGIN, USER_REGISTRATION } from '../../utils/actionURLs';
import { toast } from '../../utils/constant';
import { BOOKLIST, SIGNIN } from '../../routes';

export const getBooksData = (token) => async (dispatch, navigate) => {
  try {
    // Configure the headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    };
    const response = await axios.get(GET_BOOK, config);
    if (response.data.success) {
      dispatch({ type: GET_ITEMS, payload: response.data.data });
    } else {
      toast(response.data.message, "error");
      dispatch({ type: GET_ITEMS, payload: [] });
    }
  } catch (error) {
    console.error('Error fetching books', error);
    toast(error.response.data, "error");
    if (error?.response?.data == "jwt expired") {
      localStorage.removeItem("token");
      localStorage.removeItem("userDetails");
      navigate(SIGNIN);
    }
  }
};

export const addBook = (book, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(ADD_BOOK, book);
    if (response.data.success) {
      dispatch({ type: ADD_ITEM, payload: response.data.data });
      toast(response.data.message, "success");
      navigate(BOOKLIST);
    } else {
      toast(response.data.message, "error");
    }
  } catch (error) {
    if (error.response.data.message) {
      toast(error.response.data.message, "error");
    } else {
      toast(error.message, "error");
    }
  }
};

export const updateBook = (bookId, formData, navigate) => async (dispatch) => {
  try {
    const response = await axios.put(`${UPDATE_BOOK}/${bookId}`, formData);
    if (response.data.success) {
      dispatch({ type: UPDATE_ITEM, payload: response.data.data });
      toast(response.data.message, "success");
      navigate(BOOKLIST);
    } else {
      toast(response.data.message, "error");
    }
  } catch (error) {
    if (error.response && error.response.data.message) {
      toast(error.response.data.message, "error");
    } else {
      toast(error.message, "error");
    }
  }
};

export const deleteBook = (bookId) => async (dispatch) => {
  try {
    const response = await axios.delete(`${DELETE_BOOK}/${bookId}`);
    if (response.data.success) {
      dispatch({ type: DELETE_ITEM, payload: bookId });
      toast(response.data.message, "success");
    } else {
      toast(response.data.message, "error");
    }
  } catch (error) {
    if (error.response.data.message) {
      toast(error.response.data.message, "error");
    } else {
      toast(error.message, "error");
    }
  }
};


export const registerUser = (user, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(USER_REGISTRATION, user);
    if (response?.data?.success) {
      toast(response?.data?.message, "success");
      navigate(SIGNIN);
    } else {
      toast(response?.data?.message, "error");
    }
  } catch (error) {
    if (error?.response?.data?.message) {
      toast(error?.response?.data?.message, "error");
    } else {
      toast(error?.message, "error");
    }
  }
};

export const loginUser = (credentials, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(USER_LOGIN, credentials);
    if (response.data.success) {
      const responseData = response?.data?.data;
      console.log("responseData ::", responseData);
      const user = JSON.stringify({ email: responseData?.email, username: responseData?.username });
      localStorage.setItem("token", responseData.token);
      localStorage.setItem("userDetails", user);
      toast(response.data.message, "success");
      navigate(BOOKLIST);
    } else {
      toast(response.data.message, "error");
    }
  } catch (error) {
    if (error.response.data.message) {
      toast(error.response.data.message, "error");
    } else {
      toast(error.message, "error");
    }
  }
};

