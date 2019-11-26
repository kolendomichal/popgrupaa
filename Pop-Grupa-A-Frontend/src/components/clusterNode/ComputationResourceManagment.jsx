import React, { Component } from 'react';
import ClusterNodeList from './ClusterNodeList.jsx';
import NavBar from '../navigationBar/ComputationResourceManagmentNavBar.jsx';
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.css';

class ComputationResourceManagment extends Component {

  constructor(props) {
    super(props);
}

  render() {
    return (
      <div>
        <NavBar/>
        <Container>
          <ClusterNodeList tasksShouldRefresh={this.tasksShouldRefresh} />
        </Container>
      </div>

    );
  }
}

export default ComputationResourceManagment;