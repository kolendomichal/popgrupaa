import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class NavBar extends Component {

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
                <a className="navbar-brand" href="#">BalticLSC</a>

                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Computation Cockpit <span className="sr-only">(current)</span></a>
                        </li>
                    </ul>
                    <span className="navbar-text">
                        Log in
                    </span>
                </div>
            </nav>
        );
    }
}

export default NavBar;