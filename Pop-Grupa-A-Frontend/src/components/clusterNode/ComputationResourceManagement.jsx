import React, { Component } from 'react';
import ClusterNodeList from './ClusterNodeList.jsx';
import NavBar from '../navigationBar/ComputationResourceManagmentNavBar';
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.css';

class ComputationResourceManagement extends Component {

  render() {
    return (
      <div>
        <NavBar/>
        <Container>
          <ClusterNodeList/>
        </Container>
      </div>

    );
  }
}

export default ComputationResourceManagement;