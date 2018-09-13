import React, {Component} from 'react';
import Select from 'react-select';
import { get, isNumber, sortBy, defaultTo } from 'lodash';

class SelectField extends Component {
    render() {
        const { name, label, value, valueUpdateHandler, changeHandler, disabled, options, labelKey, valueKey, placeholder, staticField } = this.props;

        const transformedOptions = options.map(option => ({label: option[labelKey], value: option[valueKey]}));

        const onChange = (selection) => {
            valueUpdateHandler(name, get(selection, 'value', null));
            changeHandler(selection);
        }

        return (
            <div>
                <Select
                    value={ defaultTo(value, null) }
                    onChange={ onChange }
                    options={ sortBy(transformedOptions, 'label') }
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
