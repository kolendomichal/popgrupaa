import React from 'react';
import Form from 'react-bootstrap/Form';

const Select = ({label, items, input, meta: {touched, invalid, error}, ...custom}) => (
    <Form.Group validationstate={invalid.toString()} style={{width: '100%'}}>
        <Form.Control as="select"
                      placeholder={label}
                      value={input.value}
                      onChange={input.onChange}
                      isInvalid={touched && invalid}
                      {...custom}
                      {...input}>
            <option>Choose...</option>
            {Object.keys(items).map(key => (
                <option value={items[key].code}>{items[key].label}</option>
            ))}
        </Form.Control>
        <Form.Control.Feedback type="invalid">
            {error}
        </Form.Control.Feedback>
    </Form.Group>
);

export default Select;