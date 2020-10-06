import React from 'react';
import Enzyme, { shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import UnapproveConfirmation from '../../../src/components/UnapproveConfirmation/UnapproveConfirmation';

Enzyme.configure({adapter:new Adapter()});
it("render modal unapprove confirmation correctly", () => {
    const wrapper = shallow (
        <UnapproveConfirmation />
    )
    expect(wrapper).toMatchSnapshot();
})