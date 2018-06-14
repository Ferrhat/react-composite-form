import React from 'react';
import {shallow, mount} from 'enzyme';
import formFieldFactory from '../../lib/factory/formFieldFactory';

describe('formFieldFactory', () => {

    it('handles if the given type was not found', () => {
        expect(formFieldFactory.build({}, 1)).toEqual(undefined);
    });

    it('generates a text field', () => {
        const fieldWrapper = formFieldFactory.build({type: 'text', label: 'Test Label'}, 1);
        const formField = shallow(fieldWrapper);
        expect(formField.find('TextField').length).toEqual(1);
    });

    it('generates a text area field', () => {
        const fieldWrapper = formFieldFactory.build({type: 'textarea', label: 'Test Label'}, 1);
        const formField = shallow(fieldWrapper);
        expect(formField.find('TextAreaField').length).toEqual(1);
    });

    it('generates a select field', () => {
        const fieldWrapper = formFieldFactory.build({type: 'select', label: 'Test Label'}, 1);
        const formField = shallow(fieldWrapper);
        expect(formField.find('SelectField').length).toEqual(1);
    });

    it('generates a date field', () => {
        const fieldWrapper = formFieldFactory.build({type: 'date', label: 'Test Label'}, 1);
        const formField = shallow(fieldWrapper);
        expect(formField.find('DateField').length).toEqual(1);
    });

    it('generates a multiselect field', () => {
        const fieldWrapper = formFieldFactory.build({type: 'multiselect', label: 'Test Label'}, 1);
        const formField = shallow(fieldWrapper);
        expect(formField.find('MultiSelectField').length).toEqual(1);
    });

    it('generates a creatable field', () => {
        const fieldWrapper = formFieldFactory.build({type: 'creatable', label: 'Test Label'}, 1);
        const formField = shallow(fieldWrapper);
        expect(formField.find('CreatableSelectField').length).toEqual(1);
    });

    it('generates a checkbox field', () => {
        const fieldWrapper = formFieldFactory.build({type: 'checkbox', label: 'Test Label'}, 1);
        const formField = shallow(fieldWrapper);
        expect(formField.find('CheckBoxField').length).toEqual(1);
    });

    it('generates a file field', () => {
        const fieldWrapper = formFieldFactory.build({type: 'file', label: 'Test Label'}, 1);
        const formField = shallow(fieldWrapper);
        expect(formField.find('FileInputField').length).toEqual(1);
    });

});
