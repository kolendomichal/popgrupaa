import React from 'react';
import {connect} from 'react-redux';
import LoginForm from "../component/LoginForm";
import {bindActionCreators} from "redux";
import loginOperations from '../duck/loginOperations';
import { withRouter } from 'react-router-dom';

const LoginContainer = ({loginOperations, history}) => {

  const goToRegistrationPage = () => {
    history.push('/sign-up')
  };

  return (
    <div style={{marginTop: '30px'}}>
      <LoginForm onSubmit={loginOperations.sendLoginRequest} goToRegistrationPage={goToRegistrationPage}/>
    </div>)
};


const mapDispatchToProps = (dispatch) => ({
  loginOperations: bindActionCreators(loginOperations, dispatch)
});

export default connect(null, mapDispatchToProps)(LoginContainer)

