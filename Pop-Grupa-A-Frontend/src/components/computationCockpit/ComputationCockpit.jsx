import React, { Component } from 'react';
import AppList from './AppList.jsx';
import TaskList from './TaskList.jsx';
import { ComputationCockpitNavBar } from '../navigationBar/NavBars';
import Container from 'react-bootstrap/Container'
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
        <Container>
          <AppList tasksShouldRefresh={this.tasksShouldRefresh} />
          <TaskList newTaskCreated={this.state.newTaskCreated} tasksShouldRefresh={this.tasksShouldRefresh}/>
        </Container>
      </div>

    );
  }
}

export default ComputationCockpit;