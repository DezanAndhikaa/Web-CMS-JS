import React from 'react';
import Enzyme, { shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import NotifButton from "../../../components/ActionButton/NotifButton/NotifButton";

Enzyme.configure({adapter:new Adapter()});
it("render notif button correctly", () => {
  const wrapper = shallow (
    <NotifButton />
  )
  expect(wrapper).toMatchSnapshot();
})