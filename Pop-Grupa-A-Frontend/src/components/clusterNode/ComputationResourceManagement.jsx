import React, { Component } from 'react';
import ClusterNodeList from './ClusterNodeList.jsx';
import NavBar from '../navigationBar/ComputationResourceManagmentNavBar';
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.css';

class ComputationResourceManagement extends Component {

  render() {
    return (
      <React.Fragment>
        <NavBar/>
        <Container>
          <ClusterNodeList/>
        </Container>
      </React.Fragment>
    );
  }
}

export default ComputationResourceManagement;