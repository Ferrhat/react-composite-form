import React, {Component} from 'react';
import Select from 'react-select';
import { get, isNumber, sortBy, defaultTo } from 'lodash';

class MultiSelectField extends Component {
    render() {
        const { name, label, value, valueUpdateHandler, changeHandler, disabled, options } = this.props;

        const onChange = (selection) => {
            valueUpdateHandler(name, selection);
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
                    multi
                    backspaceRemoves={true}
                />
                <div className={'validationErrorMessage'}>{get(this.props.errors, '0.message', '')}</div>
            </div>
        );
    }
}

export default MultiSelectField;
