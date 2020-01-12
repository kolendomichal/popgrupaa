import React from 'react';
import {connect} from 'react-redux';
import LoginForm from "./LoginForm";
import {bindActionCreators} from "redux";
import {Redirect} from 'react-router-dom';
import loginOperations from '../../redux/login/loginOperations';
import { LoginRegistrationNavBar } from '../navigationBar/NavBars';

class LoginContainer extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            uri: undefined
        }
    }

    login = (formValues) => {
        this.props.loginOperations.sendLoginRequest(formValues).then(data => {
            console.log(data)
            if (data.payload) {
                this.setState(state => ({...state, loggedIn: true, uri: data.payload}));
            }
        });
    };

    render() {
        if(this.state.loggedIn) {
            return <Redirect to={this.state.uri} />
        }
        return (
            <React.Fragment>
                <LoginRegistrationNavBar />
                <LoginForm onSubmit={this.login}/>
            </React.Fragment>
        )
    }

}


const mapDispatchToProps = (dispatch) => ({
    loginOperations: bindActionCreators(loginOperations, dispatch)
});

export default connect(null, mapDispatchToProps)(LoginContainer)

