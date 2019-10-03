import React from "react";
import thunk from "redux-thunk";

import configureMockStore from "redux-mock-store";
import jwt from "jsonwebtoken";

import mockLocalStorage from "mockLocalStorage";
import mockAxios from "axios";

import { loadUser, login } from "../auth";

window.localStorage = mockLocalStorage;

let store;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("test Auth actions", () => {
    beforeEach(() => {
        store = mockStore();
    });

    it("loadUser", async done => {
        const mockData = {
            userId: 1,
            name: "thong"
        };

        const expectedAction = {
            type: "USER_LOADED",
            payload: { userId: 1, name: "thong" }
        };

        mockAxios.get.mockImplementationOnce(() =>
            Promise.resolve({ data: mockData })
        );

        await store.dispatch(loadUser());

        // assertions / expects
        expect(store.getActions()[0]).toEqual(expectedAction);
        expect(mockAxios.get).toHaveBeenCalledTimes(1);
        done();
    });

    it("Login test", async done => {
        const mockData = {
            data: {
                token: "sample_token"
            }
        };

        const expectedAction = {
            type: "LOGIN_SUCCESS",
            payload: { data: { token: "sample_token" } }
        };

        mockAxios.post.mockImplementationOnce(() =>
            Promise.resolve({ data: mockData })
        );

        // work
        const testData = { email: "test1@test.com", password: "1234" };
        await store.dispatch(login(testData.email, testData.password));

        // assertions / expects
        expect(store.getActions()[0]).toEqual(expectedAction);
        expect(mockAxios.post).toHaveBeenCalledTimes(1);
        done();
    });
});
