import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.css';
import loginOperations from "../../redux/login/loginOperations";
import { connect } from 'react-redux';

const LoginRegistrationNavBar = () => (
    <Navbar bg="light" variant="light" className="mb-4">
        <Navbar.Brand >BalticLSC</Navbar.Brand>
    </Navbar>
);

const ComputationCockpit = (props) => (
    <Navbar bg="light" variant="light" className="mb-4">
        <Navbar.Brand >BalticLSC</Navbar.Brand>
        <Nav className="mr-auto">
            <Nav.Link >Computation Cockpit</Nav.Link>
        </Nav>
        <Nav>
            <Nav.Link eventKey={2} onClick={props.logout}>
                Log Out
            </Nav.Link></Nav>
    </Navbar>
);

const ComputationResource = (props) => (
    <Navbar bg="light" variant="light" className="mb-4">
        <Navbar.Brand >BalticLSC</Navbar.Brand>
        <Nav className="mr-auto">
            <Nav.Link href="/computation-resource-management">Computation Resource Management</Nav.Link>
        </Nav>  
        <Nav>
            <Nav.Link eventKey={2} onClick={props.logout}>
                Log Out
            </Nav.Link></Nav>
    </Navbar>
); 

const mapDispatchToProps = (dispatch) => ({
    logout:() => dispatch(loginOperations.sendLogoutRequest())
});

const ComputationCockpitNavBar = connect(
    null,
    mapDispatchToProps
)(ComputationCockpit);

const ComputationResourceNavBar = connect(
    null,
    mapDispatchToProps
)(ComputationResource);

export {
    LoginRegistrationNavBar,
    ComputationCockpitNavBar,
    ComputationResourceNavBar
}
