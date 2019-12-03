import React, { Component } from 'react';
import ClusterNodeList from './ClusterNodeList.jsx';
import { ComputationResourceNavBar } from '../navigationBar/NavBars';
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.css';

class ComputationResourceManagement extends Component {

  render() {
    return (
      <React.Fragment>
        <ComputationResourceNavBar/>
        <Container>
          <ClusterNodeList/>
        </Container>
      </React.Fragment>
    );
  }
}

export default ComputationResourceManagement;