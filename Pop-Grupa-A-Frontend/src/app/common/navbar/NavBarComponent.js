import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Button from '../form/Button';
import Nav from 'react-bootstrap/Nav';
import {withRouter} from 'react-router-dom';

const NavBarComponent = ({sendLogoutRequest, history}) => {
    const logout = () => {
        sendLogoutRequest().then(result => {
            if (result) {
                history.push("/login")
            }
        })
    };
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">
                BatlicLSC
            </Navbar.Brand>
            <Navbar.Collapse>
                <Nav className="ml-auto">
                    <Button label="Logout" onClick={logout}/>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default withRouter(NavBarComponent);