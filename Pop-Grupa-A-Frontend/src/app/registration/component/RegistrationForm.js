import React from 'react';
import Input from "../../common/form/Input";
import {Field, reduxForm} from "redux-form";
import Button from "../../common/form/Button";
import {FormNames} from "../../constants";
import Paper from '@material-ui/core/Paper';
import './RegistrationForm.css';

const RegistrationForm = ({handleSubmit, pristine, submitting, invalid}) => (
  <Paper className="registration-form">
    <Field name="userName" component={Input} type="text" label="Login"/>
    <Field name="password" component={Input} type="password" label="Password"/>
    <Field name="email" component={Input} type="email" label="E-mail"/>
    <Button label="Registration" onClick={handleSubmit} disabled={pristine || submitting || invalid}/>
  </Paper>
);

const validate = values => {
  const errors = {};
  const requiredFields = [
    'userName',
    'password',
    'email'
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  });
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  }
  return errors
};

export default reduxForm({
  form: FormNames.RegistrationForm,
  validate
})(RegistrationForm)