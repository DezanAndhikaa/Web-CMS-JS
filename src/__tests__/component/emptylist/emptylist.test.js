import React from 'react';
import Enzyme, { shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import EmptyList from '../../../components/EmptyList/EmptyList';

Enzyme.configure({adapter:new Adapter()});
it("render empty list correctly", () => {
    const wrapper = shallow (
        <EmptyList />
    )
    expect(wrapper).toMatchSnapshot();
})