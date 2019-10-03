import React from "react";
import { shallow } from "enzyme";
import { Redirect } from "react-router-dom";
import { Login } from "../auth/Login";

it("login page have input form", () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find("input").length).toEqual(3);
    expect(wrapper.find(".btnLogin").length).toEqual(1);
    expect(wrapper.find('input[type="password"]').length).toEqual(1);
    expect(wrapper.find('input[name="email"]').length).toEqual(1);
});

it("if user logined redirect to another page", () => {
    const wrapper = shallow(<Login isAuthenticated={true} />);
    expect(wrapper.find(Redirect)).toHaveLength(1);
});

it("call login function when click on support ", () => {
    const mockFunction = jest.fn();
    const wrapper = shallow(<Login login={mockFunction} />);
    wrapper.find("form").simulate("submit", { preventDefault: () => {} });
    expect(mockFunction).toHaveBeenCalled();
});
