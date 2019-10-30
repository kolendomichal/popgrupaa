import React, { Component } from 'react';
import AppList from './AppList.jsx';
import TaskList from './TaskList.jsx';
import NavBar from '../navigationBar/NavBar.jsx';
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
        <NavBar />
        <Container>
          <AppList tasksShouldRefresh={this.tasksShouldRefresh} />
          <TaskList newTaskCreated={this.state.newTaskCreated} tasksShouldRefresh={this.tasksShouldRefresh}/>
        </Container>
      </div>

    );
  }
}

export default ComputationCockpit;