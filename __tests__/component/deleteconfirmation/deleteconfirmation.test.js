import React from 'react';
import Enzyme, { shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import DeleteConfirmation from '../../../src/components/DeleteConfirmation/DeleteConfirmation';

Enzyme.configure({adapter:new Adapter()});
it("render button close notif correctly", () => {
    const wrapper = shallow (
      <DeleteConfirmation />
    )
    expect(wrapper).toMatchSnapshot();

})