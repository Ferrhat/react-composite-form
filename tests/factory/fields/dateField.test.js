import React from 'react';
import {shallow, mount} from 'enzyme';
import DateField from "../../../lib/factory/fields/DateField";
import moment from 'moment';


describe('DateField', () => {
    const mockValueUpdateHandler = jest.fn();
    const mockChangeHandler = jest.fn();
    const dateField = shallow(<DateField valueUpdateHandler={mockValueUpdateHandler} changeHandler={mockChangeHandler} name={'testName'} />);

    it('renders properly', () => {
        expect(dateField).toMatchSnapshot();
    });

    it('contains a connected DatePicker component', () => {
        expect(dateField.find('DatePicker').length).toEqual(1);
    });

    it('has a default value', () => {
        dateField.setProps({value: '2018-12-31'}, () => {
            expect(dateField.find('DatePicker').prop('selected')).toEqual(moment('2018-12-31', 'YYYY-MM-DD'));
        });
    });

    it('should trigger a change event without a valid date', () => {
        dateField.find('DatePicker').simulate('change', null);
        expect(mockValueUpdateHandler).toBeCalledWith('testName', null);
        expect(mockChangeHandler).toBeCalledWith(null);
    });

    it('should trigger a change event with a valid date', () => {
        const value = moment('2018-12-31');
        dateField.find('DatePicker').simulate('change', value);
        expect(mockValueUpdateHandler).toBeCalledWith('testName', '2018-12-31');
        expect(mockChangeHandler).toBeCalledWith(value);
    });

});
