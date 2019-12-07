import React from 'react';
import Input from "../../common/form/Input";
import {Field, reduxForm} from "redux-form";
import Button from "../../common/form/Button";
import {FormNames, Role} from "../../constants";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {StyledCard} from '../../common/form/StyledCard';
import Select from "../../common/form/Select";

const RegistrationForm = ({handleSubmit, pristine, submitting, invalid}) => (
    <StyledCard>
        <Card.Body>
            <Container>
                <Row className="justify-content-md-center">
                    <Field name="username" component={Input} type="text" label="Login"/>
                </Row>
                <Row className="justify-content-md-center">
                    <Field name="password" component={Input} type="password" label="Password"/>
                </Row>
                <Row className="justify-content-md-center">
                    <Field name="email" component={Input} type="email" label="E-mail"/>
                </Row>
                <Row className="justify-content-md-center">
                    <Field name="role" component={Select} items={Role} label="Role"/>
                </Row>
                <Row className="justify-content-md-center">
                    <Button label="Registration" onClick={handleSubmit} disabled={pristine || submitting || invalid}/>
                </Row>
            </Container>
        </Card.Body>
    </StyledCard>
);

const validate = values => {
    const errors = {};
    const requiredFields = [
        'username',
        'password',
        'email'
    ];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    });
    if (
        values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address'
    }
    if(!Object.keys(Role).map(k => Role[k].code).find(v => v === values.role)) {
        errors.role = 'Choose a role'
    }
    return errors
};

export default reduxForm({
    form: FormNames.RegistrationForm,
    validate
})(RegistrationForm)