import React, {Component} from 'react';
import Switch from 'react-ios-switch';

class CheckBoxField extends Component {
    render() {
        const { name, label, value, valueUpdateHandler, changeHandler, disabled, options } = this.props;

        const onChange = (event) => {
            valueUpdateHandler(name, event);
            changeHandler(event);
        }

        return (
            <Switch
                checked={ value }
                onChange={ onChange }
                disabled={disabled}
                onColor={'#00C9FF'}
            />
        );
    }
}

export default CheckBoxField;
