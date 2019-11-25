import React from 'react';
import MachineListTable from './MachineListTable';
import {TableContainer} from '../../common/table/TableContainer';
import Button from '../../common/form/Button';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

const BackButton = styled(Button)`
    width: 20%;
    align-self: flex-end;
`;

const MachineList = ({history}) => {

    const goToClusterMachineList = () => history.push("/cluster-machine-list");

    return (
        <TableContainer>
            <MachineListTable/>
            <BackButton label="Back" onClick={goToClusterMachineList}/>
        </TableContainer>
    )
};

export default withRouter(MachineList);