import React, { Component } from 'react';
import NavBar from '../navigationBar/NavBar.jsx';
import 'bootstrap/dist/css/bootstrap.css';

class createNewClusterNodeForm extends Component {

  tasksShouldRefresh = (newTaskCreated) => {this.setState({newTaskCreated:newTaskCreated})}
  render() {
    return (
      <div>
        <NavBar />
      </div>

    );
  }
}

export default createNewClusterNodeForm;