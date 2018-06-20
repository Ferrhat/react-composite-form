import React, {Component} from "react";
import DatePicker from 'react-datepicker';
import moment from 'moment';



class DateField extends Component {
    render() {
        const { name, label, value, valueUpdateHandler, changeHandler, disabled } = this.props;

        const onChange = (value) => {
            const currentValue = value ? value.format('YYYY-MM-DD') : null;
            valueUpdateHandler(name, currentValue);
            changeHandler(value);
        }
        return (
            <DatePicker
                className="form-control"
                dateFormat="YYYY-MM-DD"
                disabledKeyboardNavigation
                placeholderText={ label }
                selected={ value ? moment(value, "YYYY-MM-DD") : null }
                onChange={ onChange }
                disabled={ disabled }
            />
        );
    }
}

export default DateField;
