import React from "react";
import { shallow } from "enzyme";
import { Redirect } from "react-router-dom";
import { Register } from "../auth/Register";

it("Register page have valid input form", () => {
    const wrapper = shallow(<Register />);
    expect(wrapper.find("input").length).toEqual(5);
    expect(wrapper.find('input[name="name"]').length).toEqual(1);
    expect(wrapper.find('input[name="email"]').length).toEqual(1);
    expect(wrapper.find('input[name="password"]').length).toEqual(1);
    expect(wrapper.find('input[name="password2"]').length).toEqual(1);
    expect(wrapper.find('input[type="submit"]').length).toEqual(1);
});

it("if user logined redirect to another page", () => {
    const wrapper = shallow(<Register isAuthenticated={true} />);
    expect(wrapper.find(Redirect)).toHaveLength(1);
});
