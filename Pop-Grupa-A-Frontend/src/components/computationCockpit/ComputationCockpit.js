import React, { Component } from 'react';
import AppList from './AppList.js';
import TaskList from './TaskList.js';
import NavBar from '../navigationBar/NavBar.js';
import 'bootstrap/dist/css/bootstrap.css';

class ComputationCockpit extends Component {

  constructor(props) {
    super(props);
    this.state = {
        newTaskCreated: false
    };
}
  updateTaskList = (needUpdate) => {this.setState({newTaskCreated:needUpdate})}
  render() {
    return (
      <div>
        <NavBar />
        <div className="container">
          <AppList updateTaskList={this.updateTaskList} />
          <TaskList newTask={this.state.newTaskCreated}/>
        </div>
      </div>

    );
  }
}

export default ComputationCockpit;