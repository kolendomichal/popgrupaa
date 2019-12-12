import React from 'react';
import Form from 'react-bootstrap/Form';

const Input = ({label, input, meta: {touched, invalid, error}, ...custom}, type) => (
    <Form.Group validationstate={invalid.toString()} style={{width: '100%'}}>
        <Form.Control
            type={type}
            placeholder={label}
            value={input.value}
            onChange={input.onChange}
            isInvalid={touched && invalid}
            {...custom}
            {...input}
        />
        <Form.Control.Feedback type="invalid">
            {error}
        </Form.Control.Feedback>
    </Form.Group>
);


Input.defaultProps = {
    type: "text"
};
export default Input;