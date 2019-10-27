import React, { Component } from 'react';
import AppList from './applicationList/AppList.js';
import TaskList from './taskList/TaskList.js';
import NavBar from '../navigationBar/NavBar.js';
import 'bootstrap/dist/css/bootstrap.css';

class ComputationCockpit extends Component {

  render() {
    return (
      <div>
        <NavBar />
        <div className="container">
          <AppList />
          <TaskList />
        </div>
      </div>

    );
  }
}

export default ComputationCockpit;