import React from 'react';
import {shallow, mount} from 'enzyme';
import Form from "../../lib/components/Form";


describe('Form', () => {
    const mockSubmitHandler = jest.fn(() => Promise.resolve());
    const mockChangeHandler = jest.fn();
    const form = shallow(<Form submitHandler={mockSubmitHandler} fieldKey={'name'} />);

    it('renders properly', () => {
        expect(form).toMatchSnapshot();
    });

    it('contains a hide and a submit button component', () => {
        expect(form.find('Button').length).toEqual(2);
    });

    it('calls the submithandler function', (done) => {
        const event = {
            preventDefault() {},
            target: { name: 'testName', value: 'testValue' }
        };
        form.setState({values: 'testValue'}, () => {
            expect(form.state('values')).toEqual('testValue');
            form.find('form').simulate('submit', event);
            expect(mockSubmitHandler).toBeCalled();
            process.nextTick(() => {
                expect(form.state('values')).toEqual({});
                done();
            })
        });
    });

    it('generates a text field', () => {
        form.setProps({fields: [{type: 'text', name: 'testField'}]});
        expect(form.find('TextField').length).toEqual(1);
    });

    it('stores the new value of a field', () => {
        const event = {
            preventDefault() {},
            target: { name: 'testName', value: 'testValue' }
        };

        let mounted = mount(<Form submitHandler={mockSubmitHandler} fieldKey={'name'} fields={[{type: 'text', name: 'testField', changeHandler: mockChangeHandler}]} />);
        expect(mounted.state('values')['testField']).toEqual(undefined);
        mounted.find('FormControl').simulate('change', event);
        expect(mounted.state('values')['testField']).toEqual('testValue');
    });

    it('hides the form', () => {
        expect(form.find('Button').length).toEqual(2);
        form.find('Button').first().simulate('click');
        expect(form.find('Button').length).toEqual(1);
    });

    it('validates the form', () => {
        let event = {
            preventDefault() {},
            target: { name: 'testName', value: 'testValue' }
        };

        expect(form.state('isValid')).toEqual(true);
        form.setProps({customValidator: { rule: () => false, message: 'error' }});
        form.simulate('change', event);
        setTimeout(() => {
            expect(form.state('isValid')).toEqual(false);
        }, 1000);
    });
});
