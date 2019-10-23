import React from 'react';
import {Field, reduxForm} from "redux-form";
import {FormNames} from "../../constants";
import Input from "../../common/form/Input";
import Paper from '@material-ui/core/Paper';
import './LoginForm.css';
import Button from "../../common/form/Button";
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const LoginForm = ({handleSubmit, pristine, submitting, invalid, goToRegistrationPage}) => {
  return (
    <Paper className="login-form">
      <Field name="userName" component={Input} type="text" label="Login"/>
      <Field name="password" component={Input} type="password" label="Password"/>
      <Button label="Sign in" onClick={handleSubmit} disabled={pristine || submitting || invalid}/>
      <Typography variant="body2" gutterBottom id="register-link">
        If you want to register &nbsp;
        <Link component="button" variant="body2" onClick={goToRegistrationPage} >
          Click Here
        </Link>
      </Typography>
    </Paper>
  )
};

const validate = values => {
  const errors = {};
  const requiredFields = [
    'userName',
    'password'
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  });
  return errors
};

export default reduxForm({
  form: FormNames.LoginForm,
  validate
})(LoginForm)