import React from 'react';
import {connect} from 'react-redux';
import RegistrationForm from "../component/RegistrationForm";
import registrationOperations from "../duck/registrationOperations";
import {bindActionCreators} from "redux";

const RegistrationContainer = ({registrationOperations}) => {
  return (
    <RegistrationForm onSubmit={registrationOperations.sendRegisterRequest}/>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  registrationOperations: bindActionCreators(registrationOperations, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer)
