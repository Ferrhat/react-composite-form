import React from 'react';
import {shallow, mount} from 'enzyme';
import CheckBoxField from "../../../lib/factory/fields/CheckBoxField";


describe('CheckBoxField', () => {
    const mockValueUpdateHandler = jest.fn();
    const mockChangeHandler = jest.fn();
    const checkBoxField = shallow(<CheckBoxField valueUpdateHandler={mockValueUpdateHandler} changeHandler={mockChangeHandler} name={'testName'} />);

    it('renders properly', () => {
        expect(checkBoxField).toMatchSnapshot();
    });

    it('contains a connected Switch component', () => {
        expect(checkBoxField.find('Switch').length).toEqual(1);
    });

    it('should trigger a change event', () => {
        checkBoxField.find('Switch').simulate('change', true);
        expect(mockValueUpdateHandler).toBeCalledWith('testName', true);
        expect(mockChangeHandler).toBeCalledWith(true);
    });

});
