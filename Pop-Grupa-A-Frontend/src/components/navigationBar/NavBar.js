import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class NavBar extends Component {

    render() {
        return (
            <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
                <a class="navbar-brand" href="#">BalticLSC</a>

                <div class="collapse navbar-collapse" id="navbarText">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="#">Computation Cockpit <span class="sr-only">(current)</span></a>
                        </li>
                    </ul>
                    <span class="navbar-text">
                        Log in
                    </span>
                </div>
            </nav>
        );
    }
}

export default NavBar;