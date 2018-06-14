import {validateField} from '../../lib/actions/index';

describe('validateField', () => {
    const validators = [{rule: jest.fn(input => input)}];

    it('validates an input with error', () => {
        expect(validateField(validators, false).length).toEqual(1);
    });

    it('validates an input without error', () => {
        expect(validateField(validators, true).length).toEqual(0);
    });

});
