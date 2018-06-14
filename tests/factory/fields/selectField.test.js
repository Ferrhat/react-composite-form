import React from 'react';
import {shallow, mount} from 'enzyme';
import SelectField from "../../../lib/factory/fields/SelectField";


describe('SelectField', () => {
    const mockValueUpdateHandler = jest.fn();
    const mockChangeHandler = jest.fn();
    const selectField = shallow(<SelectField valueUpdateHandler={mockValueUpdateHandler} changeHandler={mockChangeHandler} options={[]} name={'testName'} />);

    it('renders properly', () => {
        expect(selectField).toMatchSnapshot();
    });

    it('contains a connected Select component', () => {
        expect(selectField.find('Select').length).toEqual(1);
    });

    it('should trigger a change event', () => {
        const selection = {
            value: 'testValue',
        };
        selectField.find('Select').simulate('change', selection);
        expect(mockValueUpdateHandler).toBeCalledWith('testName', 'testValue');
        expect(mockChangeHandler).toBeCalledWith(selection);
    });

    it('stops loading if it contains options', () => {
        expect(selectField.find('Select').prop('isLoading')).toEqual(true);
        selectField.setProps({options: [{label: 'Test', value: 1}]}, () => {
            expect(selectField.find('Select').prop('isLoading')).toEqual(false);
        });
    });

});
