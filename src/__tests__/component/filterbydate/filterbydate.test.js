import React from 'react';
import Enzyme, { shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import FilterByPeriodDate from '../../../components/FilterByPeriodeDate/FilterByPeriodeDate';

Enzyme.configure({adapter:new Adapter()});
it("render filter by period date correctly", () => {
    const wrapper = shallow (
        <FilterByPeriodDate />
    )
    expect(wrapper).toMatchSnapshot();
})