import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.css';


function LoginRegistrationNavBar() {
    return (
        <Navbar bg="light" variant="light" className="mb-4">
            <Navbar.Brand >BalticLSC</Navbar.Brand>
        </Navbar>
    );
}

function ComputationCockpitNavBar() {
    return (
        <Navbar bg="light" variant="light" className="mb-4">
            <Navbar.Brand >BalticLSC</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link >Computation Cockpit</Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link eventKey={2} href="#logout">
                    Log Out
                </Nav.Link></Nav>
        </Navbar>
    );
}

function ComputationResourceNavBar() {
    return (
        <Navbar bg="light" variant="light" className="mb-4">
            <Navbar.Brand >BalticLSC</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/computation-resource-management">Computation Resource Management</Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link eventKey={2} href="#logout">
                    Log Out
                </Nav.Link></Nav>
        </Navbar>
    );
}


export {
    LoginRegistrationNavBar,
    ComputationCockpitNavBar,
    ComputationResourceNavBar
};