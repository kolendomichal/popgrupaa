import React from 'react';
import {connect} from 'react-redux';
import RegistrationForm from "../component/RegistrationForm";
import registrationOperations from "../duck/registrationOperations";
import {bindActionCreators} from "redux";
import {Redirect} from 'react-router-dom';

class RegistrationContainer extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {registered: false}
    }

    register = (formValues) => {
        this.props.registrationOperations.sendRegisterRequest(formValues).then(data => {
            if (data.payload) {
                this.setState(state => ({...state, registered: true}))
            }
        })
    };

    render() {
        if(this.state.registered) {
            return <Redirect to='/login'/>
        }
        return (
            <RegistrationForm onSubmit={this.register}/>
        );
    }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
    registrationOperations: bindActionCreators(registrationOperations, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer)
