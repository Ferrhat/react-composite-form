import React, {Component} from 'react';
import Select from 'react-select';
import { get, isNumber, sortBy, defaultTo } from 'lodash';

class SelectField extends Component {
    render() {
        const { name, label, value, valueUpdateHandler, changeHandler, disabled, options } = this.props;

        const onChange = (selection) => {
            valueUpdateHandler(name, get(selection, 'value', null));
            changeHandler(selection);
        }

        return (
            <div>
                <Select
                    value={ defaultTo(value, null) }
                    onChange={ onChange }
                    options={ sortBy(options, 'label') }
                    isLoading={!options.length}
                    disabled={disabled || !options.length}
                />
                <div className={'validationErrorMessage'}>{get(this.props.errors, '0.message', '')}</div>
            </div>
        );
    }
}

export default SelectField;
