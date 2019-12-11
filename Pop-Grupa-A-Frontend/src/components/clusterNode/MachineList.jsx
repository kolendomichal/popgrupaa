import React, { Component } from 'react';
import MachineListHeader from './MachineListHeader';
import Button from 'react-bootstrap/Button'
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { getMachinesForClusterNode } from '../../services/clusterService';
import { ComputationResourceNavBar } from '../navigationBar/NavBars';
import * as Cookies from 'js-cookie';

const TableContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    height: 30%;
    margin: 2% auto 0 auto;
`;



class MachineList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            clusterNodeId: false,
            clusterMachinesList: [],
            userId: Cookies.get("userId")
        };
    }

    componentDidMount(){
        const chosenClusterNodeId = this.props.match.params.chosenClusterNodeId;
        this.getMachines(chosenClusterNodeId);
    }

    getMachines(paramClusterNode) {
        getMachinesForClusterNode(paramClusterNode)
            .then(response =>
                this.setState({
                    clusterMachinesList: response,
                    clusterNodeId: paramClusterNode
                })
            );
    }

    redirectToHome = () => {
        const { history } = this.props;
        if(history) history.push('/computation-resource-management');
       }

    render() {
        return (
            <React.Fragment>
                <ComputationResourceNavBar />
                <TableContainer>
                    { this.state.clusterMachinesList.length > 0 ?
                        <React.Fragment>
                            <div className="text-center h3 mt-5">
                                List of Machines for cluster node #{this.state.clusterNodeId}
                            </div>
                            <MachineListHeader data={this.state.clusterMachinesList}/>
                        </React.Fragment>
                        :
                        <div className="text-center h3 mt-5">
                          Cluster node #{this.state.clusterNodeId} has no machines assigned. 
                        </div>
                    }
                    <div className="d-flex flex-row-reverse bd-highlight">
                        <Button variant="secondary" onClick={this.redirectToHome}> Return </Button>
                    </div>
                </TableContainer>
            </React.Fragment>
        )
    }
};

export default withRouter(MachineList);