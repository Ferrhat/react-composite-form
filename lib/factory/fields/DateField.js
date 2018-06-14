import React, {Component} from "react";
import DatePicker from 'react-datepicker';
import { get, isNumber, sortBy, defaultTo } from 'lodash';
import moment from 'moment';



class DateField extends Component {
    render() {
        const { name, label, value, valueUpdateHandler, changeHandler } = this.props;
        const today = moment();

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
            />
        );
    }
}

export default DateField;
