import React from 'react';
import Enzyme, { shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import Message from '../../../components/Message/Message';

Enzyme.configure({adapter:new Adapter()});
it("render error message component correctly", () => {
    const wrapper = shallow (
        <Message />
    )
    expect(wrapper).toMatchSnapshot();
})