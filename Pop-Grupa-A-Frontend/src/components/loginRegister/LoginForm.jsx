import React from 'react';
import {Field, reduxForm} from "redux-form";
import {FormNames, Role} from "../../commons/Constants";
import Input from "../common/Input";
import StandardButton from "../common/StandardButton";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {StyledCard} from '../common/StyledCard';

const LoginForm = ({handleSubmit, pristine, submitting, invalid}) => {
    return (
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
                        <StandardButton label="Sign in" onClick={handleSubmit} disabled={pristine || submitting || invalid}/>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Card.Text id="register-link">
                            If you want to register&nbsp;
                            <Card.Link href="/sign-up">
                                Click Here
                            </Card.Link>
                        </Card.Text>
                    </Row>
                </Container>
            </Card.Body>
        </StyledCard>
    )
};

const validate = values => {
    const errors = {};
    const requiredFields = [
        'username',
        'password'
    ];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    });
    if(!Object.keys(Role).map(k => Role[k].code).find(v => v === values.role)) {
        errors.role = 'Choose a role'
    }
    return errors
};

export default reduxForm({
    form: FormNames.LoginForm,
    validate
})(LoginForm)