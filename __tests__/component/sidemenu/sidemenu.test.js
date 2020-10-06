import React from 'react';
import Enzyme, { shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import SideMenu from '../../../src/components/SideMenu/SideMenuComponent';

Enzyme.configure({adapter:new Adapter()});
it("render side menu correctly", () => {
    const wrapper = shallow (
        <SideMenu />
    )
    expect(wrapper).toMatchSnapshot();
})