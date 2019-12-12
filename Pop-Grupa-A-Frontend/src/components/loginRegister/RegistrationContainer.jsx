import React from 'react';
import {connect} from 'react-redux';
import RegistrationForm from "./RegistrationForm";
import registrationOperations from "../../redux/register/registrationOperations";
import alertActions from "../../redux/alert/alertActions";
import {bindActionCreators} from "redux";
import {Redirect} from 'react-router-dom';
import {LoginRegistrationNavBar} from '../navigationBar/NavBars';
import { Status } from "../../commons/Constants";

class RegistrationContainer extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {registered: false}
    }

    register = (formValues) =>  {
        this.props.registrationOperations.sendRegisterRequest(formValues).then(data => {
            if (data.payload) {
                this.setState(state => ({...state, registered: true}));
                this.props.showModal("New account has been successfully created", Status.Success);
            }
        })
    };

    render() {
        if(this.state.registered) {
            return <Redirect to='/login'/>
        }
        return (
            <React.Fragment>
                <LoginRegistrationNavBar />
                <RegistrationForm onSubmit={this.register}/>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    registrationOperations: bindActionCreators(registrationOperations, dispatch),
    showModal: (message, title) => dispatch(alertActions.showAlert(message, title))
});

export default connect(null, mapDispatchToProps)(RegistrationContainer)
