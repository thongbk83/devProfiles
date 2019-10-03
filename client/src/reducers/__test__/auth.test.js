import authReducers from "../auth";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    ACCOUNT_DELETED
} from "../../actions/types";

import mockLocalStorage from "mockLocalStorage";
window.localStorage = mockLocalStorage;

it("handle actions of type LOGIN_SUCCESS", () => {
    const action = {
        type: LOGIN_SUCCESS,
        payload: { token: "sample token" }
    };

    const exptectedState = {
        isAuthenticated: true,
        loading: false,
        token: "sample token"
    };

    const newState = authReducers([], action);
    expect(newState).toEqual(exptectedState);
});

it("handle actions of type LOGIN_FAIL", () => {
    const action = {
        type: LOGIN_FAIL
    };

    const exptectedState = {
        isAuthenticated: false,
        loading: false,
        token: null
    };

    const newState = authReducers([], action);
    expect(newState).toEqual(exptectedState);
});
