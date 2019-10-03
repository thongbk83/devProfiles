import React from "react";

import { setAlert } from "../alert";
import uuidv4 from "uuid/v4";

//mock for uuid
jest.mock("uuid/v4", () => {
    let value = 1;
    return () => value++;
});

describe("set alert action", () => {
    it("it has correct type", async () => {
        const dispatch = jest.fn();

        await setAlert("newComment", "success")(dispatch);
        expect(dispatch).toBeCalledWith(
            expect.objectContaining({ type: "SET_ALERT" })
        );

        expect(dispatch).toBeCalledWith(
            expect.objectContaining({
                payload: { alertType: "success", id: 1, msg: "newComment" }
            })
        );
    });
});
