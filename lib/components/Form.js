import React, {Component} from 'react';
import { isUndefined, fromPairs, defaultTo } from 'lodash';

import {validateField} from '../actions/index';
import FormFieldFactory from '../factory/formFieldFactory';

import { Col, Button, Panel, Row, ButtonToolbar, Glyphicon } from 'react-bootstrap';

class Form extends Component {

    constructor(props) {
        super(props);

        this.state = {
            values: {},
            isVisible: true,
            isValid: true,
        };

        this.valueUpdateHandler = this.valueUpdateHandler.bind(this);
        this.generateFields = this.generateFields.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.toggleVisibility = this.toggleVisibility.bind(this);
        this.resetValues = this.resetValues.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {
        const isValid = this.validate(this.state.values);
        this.setState({ isValid });
    }

    validate(values) {
        const allFieldsAreValid = this.props.fields.every(field => {
            const currentValue = values[field.name];
            const value = isUndefined(currentValue) ? field.value : currentValue;
            const errors = validateField(defaultTo(field.validators, []), value);
            return errors.length == 0;
        });

        return allFieldsAreValid && this.props.customValidator.rule(values);
    }

    valueUpdateHandler(name, value) {
        const values = Object.assign({}, this.state.values, {[name]: value});
        const isValid = this.validate(values);
        this.setState({ values, isValid });
    }

    generateFields() {
        return this.props.fields.map((field, i) => {
            const currentValue = this.state.values[field.name];
            const value = isUndefined(currentValue) ? field.value : currentValue;
            const changeHandler = field.changeHandler ? field.changeHandler : () => {};

            return FormFieldFactory.build(Object.assign({}, field, { valueUpdateHandler: this.valueUpdateHandler, value, changeHandler}), i);
        });
    }

    resetValues() {
        this.setState({
            values: {},
        });
    }

    submitHandler(event) {
        event.preventDefault();
        const defaultValues = fromPairs(this.props.fields.map(field => [field.name, field.value]));
        const values = Object.assign({}, defaultValues, this.state.values);
        this.props.submitHandler(values).then(() => this.resetValues());
    }

    toggleVisibility() {
        this.setState({
            isVisible: !this.state.isVisible,
        });
    }

    render() {
        if (!this.state.isVisible) {
            return <Button onClick={this.toggleVisibility}>{ this.props.title }</Button>;
        }

        if(this.props.version === 'custom') {
            return (
                <div className='container-fluid'>
                    <div className="row">
                        <div className="col">
                            <form className="" onSubmit={this.submitHandler}>
                                <div className="">
                                    {this.generateFields()}
                                    <Button type="submit" bsStyle="primary" disabled={!this.state.isValid}>
                                        {this.props.submitLabel}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <Panel className="panel-shadow panel-blue-cap">
                    <Panel.Heading>
                        <Row>
                            <Col xs={8}><span>{this.props.title}</span></Col>
                            <Col xs={4}>
                                <ButtonToolbar className="pull-right" style={{ marginTop: -8 }}>
                                    <Button onClick={this.toggleVisibility}>Hide</Button>
                                </ButtonToolbar>
                            </Col>
                        </Row>
                    </Panel.Heading>
                    <Panel.Body>
                        <form className="form-horizontal" onSubmit={this.submitHandler}>
                            <div className="panel-section">
                                {this.generateFields()}
                                <Button type="submit" bsStyle="primary" className="pull-right" disabled={!this.state.isValid}>
                                    {this.props.submitLabel}
                                </Button>
                            </div>
                        </form>
                    </Panel.Body>
                </Panel>
            );
        }
    }
}

Form.defaultProps = {
    fields: [],
    submitLabel: 'Submit',
    customValidator: { rule: () => true, message: null },
};

export default Form;
