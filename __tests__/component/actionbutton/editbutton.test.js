import React from 'react';
import Enzyme, { shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import EditButton from "../../../src/components/ActionButton/EditButton/EditButton";

Enzyme.configure({adapter:new Adapter()});
it("render edit button correctly", () => {
  const wrapper = shallow (
    <EditButton />
  )
  expect(wrapper).toMatchSnapshot();
})