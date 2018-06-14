import {get, find} from 'lodash';

export function validateField(validators, value) {
    const validationErrors = validators.filter(validator => {
        const validationError = !validator.rule(value);
        return validationError;
    });
    return validationErrors;
}
