import React from 'react';
import Enzyme, { shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import DropdownList from '../../../src/components/DropdownList/DropDownList';

Enzyme.configure({adapter:new Adapter()});
it("render dropdown list correctly", () => {
    const wrapper = shallow (
        <DropdownList />
    )
    expect(wrapper).toMatchSnapshot();
})