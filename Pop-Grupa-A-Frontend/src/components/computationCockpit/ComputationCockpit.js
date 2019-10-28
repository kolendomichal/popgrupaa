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
  tasksShouldRefresh = (newTaskCreated) => {this.setState({newTaskCreated:newTaskCreated})}
  render() {
    return (
      <div>
        <NavBar />
        <div className="container">
          <AppList tasksShouldRefresh={this.tasksShouldRefresh} />
          <TaskList newTaskCreated={this.state.newTaskCreated} tasksShouldRefresh={this.tasksShouldRefresh}/>
        </div>
      </div>

    );
  }
}

export default ComputationCockpit;