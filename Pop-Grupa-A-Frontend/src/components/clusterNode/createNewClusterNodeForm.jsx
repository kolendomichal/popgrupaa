import React, { Component } from 'react';
import NavBar from '../navigationBar/NavBar.jsx';
import DynamicFormList from './FormList.jsx';
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.css';

class CreateNewClusterNodeForm extends Component {

    render() {
        return (
            <div>
                <NavBar />
                <Container>
                    <DynamicFormList />
                </Container>
            </div>

        );
    }
}

export default CreateNewClusterNodeForm;