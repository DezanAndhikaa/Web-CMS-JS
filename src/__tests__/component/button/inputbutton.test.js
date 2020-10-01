import React from 'react';
import Enzyme, { shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import InputButton from "../../../components/Button/InputButton";

Enzyme.configure({adapter:new Adapter()});
it("render input button correctly", () => {
  const wrapper = shallow (
    <InputButton />
  )
  expect(wrapper).toMatchSnapshot();
})