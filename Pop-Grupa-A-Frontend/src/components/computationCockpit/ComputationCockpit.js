import React, { Component } from 'react';
import AppList from './applicationList/AppList.js';
import NavBar from '../navigationBar/NavBar.js';
import 'bootstrap/dist/css/bootstrap.css';

const list = [
  {
    id: 'a',
    firstname: 'Robin',
    lastname: 'Wieruch',
    year: 1988,
  },
  {
    id: 'b',
    firstname: 'Dave',
    lastname: 'Davidds',
    year: 1990,
  },
];

class ComputationCockpit extends Component {

  render() {
    return (
      <div>
        <NavBar />

        <div class="container">

          <div class="row">
            <div class="col-sm">
              Left side
    </div>
            <div class="col-sm">
              Right side
    </div>
          </div>
          <div className="Cockpit">
            <p>Table</p>
            <AppList name="Sara" />
          </div>
        </div>
      </div>
    );
  }
}

export default ComputationCockpit;