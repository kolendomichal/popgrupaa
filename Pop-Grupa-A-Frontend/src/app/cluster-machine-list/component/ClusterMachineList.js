import React from 'react';
import styled from 'styled-components';
import Button from '../../common/form/Button';
import ClusterMachineListTable from './ClusterMachineListTable';
import {TableContainer} from '../../common/table/TableContainer';
import { withRouter } from 'react-router-dom';

const ButtonContainer = styled.div`
    display: grid;
    grid-template-columns: auto auto auto auto;
    grid-column-gap: 5px;
    margin-bottom: 10px;
`;
const ClusterMachineList = ({history}) => {

    const goToMachineList = () => history.push("/machine-list");

    return (
        <TableContainer>
            <ButtonContainer>
                <Button label="Show owned cluster nodes"/>
                <Button label="Create new  cluster node"/>
                <Button label="Show credit statistics"/>
            </ButtonContainer>
            <ClusterMachineListTable />
            <ButtonContainer>
                <Button label="Submit"/>
                <Button label="Safely deactivate"/>
                <Button label="Details"/>
                <Button label="Machine List" onClick={goToMachineList}/>
            </ButtonContainer>
        </TableContainer>
    )
};

export default withRouter(ClusterMachineList);