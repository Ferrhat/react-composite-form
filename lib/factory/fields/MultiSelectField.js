import React, {Component} from 'react';
import Select from 'react-select';
import { get, isNumber, sortBy, defaultTo } from 'lodash';

class MultiSelectField extends Component {
    render() {
        const { name, label, value, valueUpdateHandler, changeHandler, disabled, options, labelKey, valueKey, placeholder, staticField } = this.props;

        const transformedOptions = options.map(option => ({label: option[labelKey], value: option[valueKey]}));

        const onChange = (selection) => {
            valueUpdateHandler(name, selection);
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
                    multi
                    backspaceRemoves={true}
                />
                <div className={'validationErrorMessage'}>{get(this.props.errors, '0.message', '')}</div>
            </div>
        );
    }
}

MultiSelectField.defaultProps = {
    labelKey: 'label',
    valueKey: 'value',
};

export default MultiSelectField;
