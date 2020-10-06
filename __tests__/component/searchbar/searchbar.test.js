import React from 'react';
import Enzyme, { shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import SearchInput from "../../../src/components/Searchbar/SearchInput";

Enzyme.configure({adapter:new Adapter()});
it("render searchbar correctly", () => {
  const wrapper = shallow (
    <SearchInput />
  )
  expect(wrapper).toMatchSnapshot();
})
