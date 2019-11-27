import React, { Component } from 'react';
import ClusterNodeList from './ClusterNodeList.jsx';
import NavBar from '../navigationBar/ComputationResourceManagmentNavBar.jsx';
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.css';

class ComputationResourceManagment extends Component {

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

export default ComputationResourceManagment;