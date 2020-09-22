import React from 'react';
import Enzyme, { shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import DeleteButton from "../../../components/ActionButton/DeleteButton/DeleteButton";

Enzyme.configure({adapter:new Adapter()});
it("render deletebutton correctly", () => {
    const wrapper = shallow (
      <DeleteButton />
    )
    expect(wrapper).toMatchSnapshot();

})