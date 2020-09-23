import React from 'react';
import Enzyme, { shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import NavigationBar from '../../../components/NavigationBar/NavBarComponent';

Enzyme.configure({adapter:new Adapter()});
it("render error navigation bar component correctly", () => {
    const wrapper = shallow (
        <NavigationBar />
    )
    expect(wrapper).toMatchSnapshot();
})