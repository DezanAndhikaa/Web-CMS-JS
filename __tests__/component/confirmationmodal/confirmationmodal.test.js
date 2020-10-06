import React from 'react';
import Enzyme, { shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import ConfirmationModal from 'components/ConfirmationModal/ConfirmationModal';

Enzyme.configure({adapter:new Adapter()});
it("render confirmation modal correctly", () => {
    const wrapper = shallow (
        <ConfirmationModal />
    )
    expect(wrapper).toMatchSnapshot();
})