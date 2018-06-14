import React, {Component} from "react";
import { FormControl } from 'react-bootstrap';
import { defaultTo, get } from 'lodash';

class TextField extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { name, label, value, valueUpdateHandler, changeHandler, disabled } = this.props;

        const onChange = (evt) => {
            valueUpdateHandler(name, evt.target.value);
            changeHandler(evt);
        }

        return (
            <div>
                <FormControl
                    value={ defaultTo(value, '') }
                    onChange={ onChange }
                    type="text"
                    componentClass={ 'input' }
                    placeholder={ label }
                    disabled={ disabled }
                />
                <div className={'validationErrorMessage'}>{get(this.props.errors, '0.message', '')}</div>
            </div>
        );
    }
}

export default TextField;
