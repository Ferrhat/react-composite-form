import React, {Component} from 'react';
import { Creatable } from 'react-select';
import { get, isNumber, sortBy, defaultTo } from 'lodash';

class CreatableSelectField extends Component {

    constructor(props) {
        super(props);
        this.state = {
            options: [...props.options],
        };
    }

    render() {
        const { name, label, value, valueUpdateHandler, changeHandler, disabled, options } = this.props;

        const onChange = (selection) => {
            if (get(selection, 'value', null) && !this.state.options.find(option => option.value == selection.value)) {
                this.setState({
                    options: [...this.state.options, selection],
                });
            }
            valueUpdateHandler(name, get(selection, 'value', null));
            changeHandler(selection);
        }

        return (
            <Creatable
                value={ defaultTo(value, null) }
                onChange={ onChange }
                options={ sortBy(this.state.options, 'label') }
                isLoading={!options.length}
                disabled={disabled || !options.length}
                backspaceRemoves={false}
            />
        );
    }
}

export default CreatableSelectField;
