import React, {Component} from 'react';
import { Creatable } from 'react-select';
import { get, isNumber, sortBy, defaultTo, unionWith, isEqual, uniqBy } from 'lodash';

class CreatableSelectField extends Component {

    constructor(props) {
        super(props);
        this.transformOptions = this.transformOptions.bind(this);

        this.state = {
            options: this.transformOptions([...props.options]),
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!isEqual(this.props.options, nextProps.options)) {
            this.setState({
                options: this.transformOptions(unionWith(nextProps.options, this.state.options, isEqual)),
            });
        }
    }

    transformOptions(options) {
        return options.map(option => ({label: option[this.props.labelKey], value: option[this.props.valueKey]}));
    }

    render() {
        const { name, label, value, valueUpdateHandler, changeHandler, disabled, placeholder, staticField } = this.props;

        const onChange = (selection) => {
            this.setState({
                options: uniqBy([...this.state.options, ...selection], 'value'),
            });
            valueUpdateHandler(name, selection);
            changeHandler(selection);
        }

        return (
            <div>
                <Creatable
                    value={ defaultTo(value, null) }
                    onChange={ onChange }
                    options={ sortBy(this.state.options, 'label') }
                    isLoading={!this.state.options.length && !staticField}
                    disabled={defaultTo(disabled, !this.state.options.length)}
                    placeholder={placeholder}
                    multi
                    backspaceRemoves={true}
                />
                <div className={'validationErrorMessage'}>{get(this.props.errors, '0.message', '')}</div>
            </div>
        );
    }
}

CreatableSelectField.defaultProps = {
    labelKey: 'label',
    valueKey: 'value',
};

export default CreatableSelectField;
