import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import loginOperations from '../../login/duck/loginOperations';
import NavBarComponent from './NavBarComponent';

const NavBar = ({loginOperations}) => {
    return (
        <NavBarComponent sendLogoutRequest={loginOperations.sendLogoutRequest}/>
    );
};

const mapDispatchToProps = (dispatch) => ({
    loginOperations: bindActionCreators(loginOperations, dispatch)
});

export default connect(null, mapDispatchToProps)(NavBar);