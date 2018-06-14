import React, {Component} from "react";
import { Col, FormGroup, Button } from 'react-bootstrap';
import TextField from './fields/TextField';
import TextAreaField from './fields/TextAreaField';
import SelectField from './fields/SelectField';
import DateField from './fields/DateField';
import MultiSelectField from './fields/MultiSelectField';
import CreatableSelectField from './fields/CreatableSelectField';
import CheckBoxField from './fields/CheckBoxField';
import FileInputField from './fields/FileInputField';

class FieldWrapper extends Component {
    render() {
        return (
            <FormGroup>
                <div className="form-group-before" />
                <label className="col-sm-2 control-label">{ this.props.label }</label>
                <Col sm={10}>
                    {this.props.children}
                </Col>
                <div className="form-group-after" />
            </FormGroup>
        );
    }
}

class formFieldFactory extends Component {

    static build(field, key) {
        let fieldComponent;
        switch (field.type) {
            case 'text':
                fieldComponent = <TextField { ... field } />;
                break;
            case 'textarea':
                fieldComponent = <TextAreaField { ... field } />;
                break;
            case 'select':
                fieldComponent =  <SelectField { ... field } />;
                break;
            case 'date':
                fieldComponent =  <DateField { ... field } />;
                break;
            case 'multiselect':
                fieldComponent =  <MultiSelectField { ... field } />;
                break;
            case 'creatable':
                fieldComponent =  <CreatableSelectField { ... field } />;
                break;
            case 'checkbox':
                fieldComponent =  <CheckBoxField { ... field } />;
                break;
            case 'file':
                fieldComponent =  <FileInputField { ... field } />;
                break;
            default:
                return undefined;
        }
        return <FieldWrapper label={field.label} key={key}>{fieldComponent}</FieldWrapper>;
    }

}

export default formFieldFactory;
