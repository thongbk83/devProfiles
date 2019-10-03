import React from "react";
import thunk from "redux-thunk";

import configureMockStore from "redux-mock-store";
import jwt from "jsonwebtoken";

import mockLocalStorage from "mockLocalStorage";
import mockAxios from "axios";
import { getCurrentProfile, deleteAccount } from "../profile";

window.localStorage = mockLocalStorage;

let store;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("test profile actions", () => {
    beforeEach(() => {
        store = mockStore();
        window.confirm = jest.fn(() => true);
    });

    it("getCurrentProfile", async done => {
        const mockData = {
            id: 1,
            user: "userId",
            company: "company",
            status: "status",
            skill: ["html", "javascript"]
        };

        const expectedAction = {
            type: "GET_PROFILE",
            payload: {
                id: 1,
                user: "userId",
                company: "company",
                status: "status",
                skill: ["html", "javascript"]
            }
        };

        mockAxios.get.mockImplementationOnce(() =>
            Promise.resolve({ data: mockData })
        );

        await store.dispatch(getCurrentProfile());

        // assertions / expects
        expect(store.getActions()[0]).toEqual(expectedAction);
        expect(mockAxios.get).toHaveBeenCalledTimes(1);
        done();
    });

    it("deleteAccount", async done => {
        const mockData = {
            id: 1,
            user: "userId",
            company: "company",
            status: "status",
            skill: ["html", "javascript"]
        };

        const expectedAction0 = {
            type: "CLEAR_PROFILE"
        };
        const expectedAction1 = {
            type: "ACCOUNT_DELETED"
        };

        mockAxios.get.mockImplementationOnce(() =>
            Promise.resolve({ data: mockData })
        );

        await store.dispatch(deleteAccount());

        // assertions / expects
        expect(window.confirm).toBeCalled();
        expect(store.getActions()[0]).toEqual(expectedAction0);
        expect(store.getActions()[1]).toEqual(expectedAction1);
        expect(store.getActions()[2].type).toEqual("SET_ALERT");
        done();
    });
});
