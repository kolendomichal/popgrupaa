import React from 'react';
import styled from 'styled-components';
import Button from '../../common/form/Button';
import ClusterMachineListTable from './ClusterMachineListTable';
import {TableContainer} from '../../common/table/TableContainer';
import renderIf from 'render-if';
import { withRouter } from 'react-router-dom';

const ButtonContainer = styled.div`
    display: grid;
    grid-template-columns: auto auto auto auto;
    grid-column-gap: 5px;
    margin-bottom: 10px;
`;

class ClusterMachineList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {data: [], machineId: undefined}
    }

    goToMachineList = () => this.props.history.push("/machine-list");

    onTableRowClick = (d) => this.setState((state) => ({...state, machineId: d.id}));

    fillData = () => this.setState((state) => ({...state, data: [
        {id: 1, status: "Active"},
        {id: 2, status: "Submitted"}
    ]}));
    removeData = () => this.setState((state) => ({...state, data: []}));

    render() {
        return (
            <TableContainer>
                <ButtonContainer>
                    <Button label="Show owned cluster nodes" onClick={this.fillData}/>
                    <Button label="Create new  cluster node" onClick={this.removeData}/>
                    <Button label="Show credit statistics"/>
                </ButtonContainer>
                <ClusterMachineListTable data={this.state.data} onRowClick={this.onTableRowClick}/>
                {renderIf(this.state.data.length > 0)(() => (
                    <ButtonContainer>
                        <Button label="Submit"/>
                        <Button label="Safely deactivate"/>
                        <Button label="Details"/>
                        <Button label="Machine List" onClick={this.goToMachineList} disabled={!this.state.machineId}/>
                    </ButtonContainer>
                ))}
            </TableContainer>
        )
    }
}
export default withRouter(ClusterMachineList);