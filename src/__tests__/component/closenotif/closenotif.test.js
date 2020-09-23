import React from 'react';
import Enzyme, { shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import CloseNotif from '../../../components/CloseNotif/CloseNotif';

Enzyme.configure({adapter:new Adapter()});
it("render button close notif correctly", () => {
  const wrapper = shallow (
    <CloseNotif />
  )
  expect(wrapper).toMatchSnapshot();
})