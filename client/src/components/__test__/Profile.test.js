import React from "react";
import { shallow } from "enzyme";
import { Redirect, Link } from "react-router-dom";

import { Profile } from "../profile/Profile";
import ProfileAbout from "../profile/ProfileAbout";
import ProfileEducation from "../profile/ProfileEducation";
import ProfileExperience from "../profile/ProfileExperience";
import ProfileTop from "../profile/ProfileTop";

it("Profile page has valid children with Profile", () => {
    const propsMock = {
        getProfileById: jest.fn(),
        profile: { profile: { id: 1 }, loading: false },
        auth: { isAuthenticated: false },
        match: { params: { id: 1 } }
    };

    const wrapper = shallow(<Profile {...propsMock} />);
    expect(wrapper.find(ProfileTop).length).toEqual(1);
    expect(wrapper.find(ProfileAbout).length).toEqual(1);
    expect(wrapper.find(ProfileEducation).length).toEqual(0);
    expect(wrapper.find(ProfileExperience).length).toEqual(0);
});
