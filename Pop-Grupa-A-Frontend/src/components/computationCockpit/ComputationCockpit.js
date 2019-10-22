import React, { Component } from 'react';
import AppList from './applicationList/AppList.js';
import TaskList from './taskList/TaskList.js';
import NavBar from '../navigationBar/NavBar.js';
import 'bootstrap/dist/css/bootstrap.css';

const listitems = [
  {
    id: 0,
    context: "Test App1",
  },
  {
    id: 1,
    context: "Test App2",
  },
  {
    id: 2,
    context: "Test App3",
  },
  {
    id: 3,
    context: "Test App4",
  },
  {
    id: 4,
    context: "Test App5",
  }
]


class ComputationCockpit extends Component {

  render() {
    return (
      <div>
        <NavBar />
        <div class="container">
          <AppList />
          <TaskList />
        </div>
      </div>

    );
  }
}

export default ComputationCockpit;