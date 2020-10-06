import React from 'react';
import Enzyme, { shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import FilterByTitle from 'components/FilterByTitle/DropdownFilter';

Enzyme.configure({adapter:new Adapter()});
it("render filter by title correctly", () => {
    const wrapper = shallow (
        <FilterByTitle />
    )
    expect(wrapper).toMatchSnapshot();
})