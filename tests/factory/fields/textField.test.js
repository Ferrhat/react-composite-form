import React from 'react';
import {shallow, mount} from 'enzyme';
import TextField from "../../../lib/factory/fields/TextField";


describe('TextField', () => {
    const mockValueUpdateHandler = jest.fn();
    const mockChangeHandler = jest.fn();
    const textField = shallow(<TextField valueUpdateHandler={mockValueUpdateHandler} changeHandler={mockChangeHandler} name={'testName'} />);

    it('renders properly', () => {
        expect(textField).toMatchSnapshot();
    });

    it('contains a connected FormControl component', () => {
        expect(textField.find('FormControl').length).toEqual(1);
    });

    it('should trigger a change event', () => {
        const event = {
            preventDefault() {},
            target: { name: 'testName', value: 'testValue' }
        };
        textField.find('FormControl').simulate('change', event);
        expect(mockValueUpdateHandler).toBeCalledWith('testName', 'testValue');
        expect(mockChangeHandler).toBeCalledWith(event);
    });

});
