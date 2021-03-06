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
      <React.Fragment>
        <ComputationCockpitNavBar />
        <Container>
          <AppList tasksShouldRefresh={this.tasksShouldRefresh} />
          <TaskList newTaskCreated={this.state.newTaskCreated} tasksShouldRefresh={this.tasksShouldRefresh}/>
        </Container>
      </React.Fragment>

    );
  }
}

export default ComputationCockpit;