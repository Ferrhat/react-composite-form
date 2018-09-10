import React from 'react';
import {shallow, mount} from 'enzyme';
import MultiSelectField from "../../../lib/factory/fields/MultiSelectField";


describe('MultiSelectField', () => {
    const mockValueUpdateHandler = jest.fn();
    const mockChangeHandler = jest.fn();
    let multiSelectField = shallow(<MultiSelectField valueUpdateHandler={mockValueUpdateHandler} changeHandler={mockChangeHandler} options={[]} name={'testName'} />);

    it('renders properly', () => {
        expect(multiSelectField).toMatchSnapshot();
    });

    it('contains a connected Select component', () => {
        expect(multiSelectField.find('Select').length).toEqual(1);
    });

    it('should trigger a change event', () => {
        const selection = {
            value: 'testValue',
        };
        multiSelectField.find('Select').simulate('change', selection);
        expect(mockValueUpdateHandler).toBeCalledWith('testName', selection);
        expect(mockChangeHandler).toBeCalledWith(selection);
    });

    it('stops loading if it contains static data', () => {
        expect(multiSelectField.find('Select').prop('isLoading')).toEqual(true);
        multiSelectField.setProps({options: [{label: 'Test', value: 1}]}, () => {
            expect(multiSelectField.find('Select').prop('isLoading')).toEqual(false);
        });
    });

    it('changes the id, name to label, value', () => {
        multiSelectField = mount(<MultiSelectField valueUpdateHandler={mockValueUpdateHandler} changeHandler={mockChangeHandler} options={[]} name={'testName'} />);
        multiSelectField.setProps({options: [{name: 'Test', id: 1}], labelKey: 'name', valueKey: 'id'}, () => {
            expect(multiSelectField.prop('options')).toEqual([{name: 'Test', id: 1}]);
            expect(multiSelectField.find('Select').prop('options')).toEqual([{label: 'Test', value: 1}]);
        });
    });

});
