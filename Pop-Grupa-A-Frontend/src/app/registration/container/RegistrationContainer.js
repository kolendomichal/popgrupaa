import React from 'react';
import {connect} from 'react-redux';
import RegistrationForm from "../component/RegistrationForm";
import registrationOperations from "../duck/registrationOperations";
import {bindActionCreators} from "redux";
import {Redirect} from 'react-router-dom';
import {LoginRegistrationNavBar} from '../../../components/navigationBar/NavBars';

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
