import alertReducers from "../alert";
import { SET_ALERT, REMOVE_ALERT } from "../../actions/types";

it("handle actions of type SET_ALERT", () => {
    const action = {
        type: SET_ALERT,
        payload: "new Comment"
    };

    const newState = alertReducers([], action);
    expect(newState).toEqual(["new Comment"]);
});

it("handle actions of type SET_ALERT", () => {
    const action = {
        type: REMOVE_ALERT,
        payload: 1
    };

    const mockData = [{ id: 1, text: "alert" }];

    const newState = alertReducers(mockData, action);
    expect(newState).toEqual([]);
});
