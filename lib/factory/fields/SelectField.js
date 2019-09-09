import React, {Component} from 'react';
import Select from 'react-select';
import { get, isNumber, orderBy, defaultTo } from 'lodash';

class SelectField extends Component {
    render() {
        const { name, label, value, valueUpdateHandler, changeHandler, disabled, options, labelKey, valueKey, placeholder, staticField, sortBy } = this.props;

        let transformedOptions = options.map(option => ({label: option[labelKey], value: option[valueKey]}));

        const onChange = (selection) => {
            valueUpdateHandler(name, get(selection, 'value', null));
            changeHandler(selection);
        }

        const sortProperty = get(sortBy, 'propertyName', '');
        const sortOrder = get(sortBy, 'order', 'asc');
        if (sortProperty) {
            transformedOptions = orderBy(transformedOptions, sortProperty, sortOrder);
        } else {
            transformedOptions = orderBy(transformedOptions, 'label');
        }

        return (
            <div>
                <Select
                    value={ defaultTo(value, null) }
                    onChange={ onChange }
                    options={ transformedOptions }
                    isLoading={!transformedOptions.length && !staticField}
                    disabled={disabled || !transformedOptions.length}
                    placeholder={placeholder}
                />
                <div className={'validationErrorMessage'}>{get(this.props.errors, '0.message', '')}</div>
            </div>
        );
    }
}

SelectField.defaultProps = {
    labelKey: 'label',
    valueKey: 'value',
};

export default SelectField;
