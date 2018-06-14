import React from 'react';
import {shallow, mount} from 'enzyme';
import TextAreaField from "../../../lib/factory/fields/TextAreaField";


describe('TextAreaField', () => {
    const mockValueUpdateHandler = jest.fn();
    const mockChangeHandler = jest.fn();
    const textAreaField = shallow(<TextAreaField valueUpdateHandler={mockValueUpdateHandler} changeHandler={mockChangeHandler} name={'testName'} />);

    it('renders properly', () => {
        expect(textAreaField).toMatchSnapshot();
    });

    it('contains a connected FormControl component', () => {
        expect(textAreaField.find('FormControl').length).toEqual(1);
    });

    it('should trigger a change event', () => {
        const event = {
            preventDefault() {},
            target: { name: 'testName', value: 'testValue' }
        };
        textAreaField.find('FormControl').simulate('change', event);
        expect(mockValueUpdateHandler).toBeCalledWith('testName', 'testValue');
        expect(mockChangeHandler).toBeCalledWith(event);
    });

});
