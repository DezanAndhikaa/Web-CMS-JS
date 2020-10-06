import React from 'react';
import Enzyme, { shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import PopUpMenu from 'components/PopUpMenu/PopUpMenu';

Enzyme.configure({adapter:new Adapter()});
it("render pop up menu correctly", () => {
    const wrapper = shallow (
        <PopUpMenu />
    )
    expect(wrapper).toMatchSnapshot();
})