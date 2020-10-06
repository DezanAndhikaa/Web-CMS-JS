import React from 'react';
import Enzyme, { shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import InputText from 'components/InputText/InputText';

Enzyme.configure({adapter:new Adapter()});
it("render input text correctly", () => {
    const wrapper = shallow (
        <InputText />
    )
    expect(wrapper).toMatchSnapshot();
})