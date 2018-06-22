import React, {Component} from 'react';
import Switch from 'react-ios-switch';

class CheckBoxField extends Component {
    render() {
        const { name, value, valueUpdateHandler, changeHandler, disabled } = this.props;

        const onChange = (event) => {
            valueUpdateHandler(name, event);
            changeHandler(event);
        }

        return (
            <div>
                <Switch
                    checked={ value }
                    onChange={ onChange }
                    disabled={disabled}
                    onColor={'#00C9FF'}
                />
                <div className={'validationErrorMessage'}>{get(this.props.errors, '0.message', '')}</div>
            </div>
        );
    }
}

export default CheckBoxField;
