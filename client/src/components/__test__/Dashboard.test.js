import React from "react";
import { shallow } from "enzyme";
import { Link } from "react-router-dom";
import { Dashboard } from "../dashboard/Dashboard";
import { DashboardActions } from "../dashboard/DashboardActions";
import Education from "../dashboard/Education";
import Experience from "../dashboard/Experience";

it("Dashboard page has valid children with Profile", () => {
    const propsMock = {
        getCurrentProfile: jest.fn(),
        deleteAccount: jest.fn(),
        auth: { user: { id: "123", name: "abc" } },
        profile: { profile: { id: 123 }, loading: false }
    };

    const wrapper = shallow(<Dashboard {...propsMock} />);
    expect(wrapper.find(DashboardActions).length).toEqual(1);
    expect(wrapper.find(Education).length).toEqual(1);
    expect(wrapper.find(Experience).length).toEqual(1);
});

it("Dashboard page has valid children with null Profile", () => {
    const propsMock = {
        getCurrentProfile: jest.fn(),
        deleteAccount: jest.fn(),
        auth: { user: { id: "123", name: "abc" } },
        profile: { profile: null, loading: false }
    };

    const wrapper = shallow(<Dashboard {...propsMock} />);
    expect(wrapper.find(DashboardActions).length).toEqual(0);
    expect(wrapper.find(Education).length).toEqual(0);
    expect(wrapper.find(Experience).length).toEqual(0);
    expect(wrapper.find(Link)).toHaveLength(1);
});
