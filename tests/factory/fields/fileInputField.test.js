import React from 'react';
import {mount} from 'enzyme';
import FileInputField from "../../../lib/factory/fields/FileInputField";


describe('FileInputField', () => {
    const mockValueUpdateHandler = jest.fn();
    const mockChangeHandler = jest.fn();
    const fileInputField = mount(<FileInputField valueUpdateHandler={mockValueUpdateHandler} changeHandler={mockChangeHandler} name={'testName'} />);

    it('renders properly', () => {
        expect(fileInputField).toMatchSnapshot();
    });

    it('contains an input component', () => {
        expect(fileInputField.find('Button').length).toEqual(1);
        fileInputField.find('Button').simulate('click');
        fileInputField.setProps({value: {name: 'testFileName'}});
        expect(fileInputField.find('input').length).toEqual(1);
    });

    it('should trigger a change event', () => {
        const event = {
            target: { files: ['test'] }
        };
        fileInputField.find('input').simulate('change', event);
        expect(mockValueUpdateHandler).toBeCalledWith('testName', 'test');
        expect(mockChangeHandler).toBeCalled();
    });

});
