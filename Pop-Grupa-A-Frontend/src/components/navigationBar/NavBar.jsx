import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.css';

function NavBar() {
    return (
        <Navbar bg="light" variant="light" className="mb-4">
            <Navbar.Brand href="#home">BalticLSC</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="#cockpit">Computation Cockpit</Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link eventKey={2} href="#logout">
                    Log Out
                </Nav.Link></Nav>
        </Navbar>
    );
}

export default NavBar;