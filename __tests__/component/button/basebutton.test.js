import React from 'react';
import Enzyme, { shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import BaseButton from "components/Button/BaseButton";

Enzyme.configure({adapter:new Adapter()});
it("render base button correctly", () => {
  const wrapper = shallow (
    <BaseButton />
  )
  expect(wrapper).toMatchSnapshot();
})