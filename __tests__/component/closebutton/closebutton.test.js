import React from 'react';
import Enzyme, { shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import CloseButton from 'components/CloseButton/CloseButton';

Enzyme.configure({adapter:new Adapter()});
it("render button close correctly", () => {
  const wrapper = shallow (
    <CloseButton />
  )
  expect(wrapper).toMatchSnapshot();
})