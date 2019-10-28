import React from 'react';
import {connect} from 'react-redux';
import LoginForm from "../component/LoginForm";
import {bindActionCreators} from "redux";
import loginOperations from '../duck/loginOperations';

const LoginContainer = ({loginOperations}) => {

    return (
        <LoginForm onSubmit={loginOperations.sendLoginRequest}/>
    )
};


const mapDispatchToProps = (dispatch) => ({
    loginOperations: bindActionCreators(loginOperations, dispatch)
});

export default connect(null, mapDispatchToProps)(LoginContainer)

