import React from 'react';
import { ComputationResourceNavBar } from '../navigationBar/NavBars';
import DynamicFormList from './FormList.jsx';
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.css';

const CreateNewClusterNodeForm = () => (
    <React.Fragment>
        <ComputationResourceNavBar />
        <Container>
            <DynamicFormList />
        </Container>
    </React.Fragment>
);

export default CreateNewClusterNodeForm; 