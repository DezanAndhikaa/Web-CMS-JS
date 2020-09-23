import React from 'react';
import Enzyme, { shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import FilterbyDataAction from '../../../components/FilterbyDataAction/FilterbyDataAction';

Enzyme.configure({adapter:new Adapter()});
it("render filter by data action correctly", () => {
    const wrapper = shallow (
        <FilterbyDataAction />
    )
    expect(wrapper).toMatchSnapshot();
})