import React from 'react';
import {connect} from 'react-redux';
import RegistrationForm from "./RegistrationForm";
import registrationOperations from "../../redux/register/registrationOperations";
import {bindActionCreators} from "redux";
import {Redirect} from 'react-router-dom';
import {LoginRegistrationNavBar} from '../navigationBar/NavBars';

class RegistrationContainer extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {registered: false}
    }

    register = (formValues) => {
        this.props.registrationOperations.sendRegisterRequest(formValues).then(data => {
            if (data.payload) {
                this.setState(state => ({...state, registered: true}));
                alert("Registration successful");
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

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
    registrationOperations: bindActionCreators(registrationOperations, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer)
