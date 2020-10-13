import React from 'react';
import Enzyme, { shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import ApproveConfirmation from "components/ApproveConfirmation/ApproveConfirmation";

Enzyme.configure({adapter:new Adapter()});
it("render modal approve confirmation correctly", () => {
  const wrapper = shallow (
    <ApproveConfirmation />
  )
  expect(wrapper).toMatchSnapshot();
})