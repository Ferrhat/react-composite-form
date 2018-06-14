import React, {Component} from "react";
import { Button } from 'react-bootstrap';
import { get } from 'lodash';

class FileInputField extends Component {

    render() {
        const { name, label, value, valueUpdateHandler, changeHandler, disabled } = this.props;
        let fileInput;
        let buttonLabel = label;
        let fileName = get(value, 'name');
        if (fileName) {
            buttonLabel += `: ${fileName}`;
        }


        const onChange = (event) => {
            valueUpdateHandler(name, event.target.files[0]);
            changeHandler(event);
        }

        const onClick = () => {
            if (fileInput) {
                fileInput.value = null;
                fileInput.click();
            }
        }

        return (
            <div>
                <Button onClick={onClick} disabled={disabled}>
                    <span className="glyphicon glyphicon-import" />
                    { buttonLabel }
                    <input type="file" style={{ display: 'none' }} onChange={onChange} ref={ref => fileInput = ref} />
                </Button>
                <div className={'validationErrorMessage'}>{get(this.props.errors, '0.message', '')}</div>
            </div>
        );
    }
}

export default FileInputField;
