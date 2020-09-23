import React from 'react';
import Enzyme, { shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import FilterByLifetime from '../../../components/FilterByLifetime/FilterByLifetime';

Enzyme.configure({adapter:new Adapter()});
it("render filter by lifetime correctly", () => {
    const wrapper = shallow (
        <FilterByLifetime />
    )
    expect(wrapper).toMatchSnapshot();
})