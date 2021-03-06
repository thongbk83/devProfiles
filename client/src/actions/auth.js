import api from "../utils/api";
import { setAlert } from "./alert";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE
} from "./types";

// Load User
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        api.defaults.headers.common["x-auth-token"] = localStorage.token;
    }

    try {
        const res = await api.get("/api/auth");
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: AUTH_ERROR
        });
    }
};

//Register User
export const register = ({ name, email, password }) => async dispatch => {
    const body = JSON.stringify({ name, email, password });

    try {
        const res = await api.post("/api/users", body);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => {
                dispatch(setAlert(error.msg, "danger"));
            });
        }

        dispatch({
            type: REGISTER_FAIL
        });
    }
};

// Login User
export const login = (email, password) => async dispatch => {
    const body = JSON.stringify({ email, password });

    try {
        const res = await api.post("/api/auth", body);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    } catch (err) {
        console.log(76, err);
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
        }

        dispatch({
            type: LOGIN_FAIL
        });
    }
};

// Logout / Clear Profile
export const logout = () => dispatch => {
    dispatch({ type: LOGOUT });
};
