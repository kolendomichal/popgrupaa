import React, { Component } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { getClustersForUser, submitClusterNode } from '../../services/clusterService';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ModalMessege } from '../modalMesseges/MessegingModal';
import Spinner from 'react-bootstrap/Spinner';

const ButtonContainer = styled.div`
    display: grid;
    grid-template-columns: auto auto auto auto;
    grid-column-gap: 5px;
    margin-bottom: 10px;
`;

class ClusterNodeList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chosenClusterNodeId: false,
            clusterNodeList: [],
            userId: 1,
            loading: false,
            response: {
                showModal: false,
                title: "",
                message: ""
            } 
        };
    }

    onModalHide = () => {
        this.setState({ response: { showModal: false } });
    }

    onClusterNodeClick = (chosenClusterNodeId) => {
        this.setState({ chosenClusterNodeId });
    }

    getClusters() {
        getClustersForUser(this.state.userId)
            .then(response =>
                this.setState({
                    clusterNodeList: response
                })
            );
    }

    submitCluster() {
        submitClusterNode(this.state.chosenClusterNodeId)
            .then(
                (response) => {
                    this.setState({
                        listitems: this.getClusters(),
                        loading: false,
                        response:{
                            showModal: true,
                            title: response.status,
                            message: response.message
                        }
                    })
                },
                (error) => {
                    this.setState({
                        loading: false,
                        response:{
                            showModal: true,
                            title: "Error",
                            message: error.message
                        }
                    })
                }
            );
    }

    render() {
        const chosenClusterNodeStyle = {
            backgroundColor: "DodgerBlue"
        };
        return (
            <div>
                <ModalMessege show={this.state.response.showModal} response={this.state.response} onHide={() => this.onModalHide()}/> 
                <Row>
                    <Col sm>
                        {<Button variant="secondary" block onClick={() => this.getClusters()}>Show owned cluster nodes</Button>}
                    </Col>
                    <Col sm>
                        <Button variant="secondary" block><Link style={{textDecoration: 'none', color: '#ffffff'}} to="/computation-resource-management/create-new-cluster-node">Create new cluster node</Link></Button>
                    </Col>
                    <Col sm>
                        <Button variant="secondary" block>Show credit statistics</Button>
                    </Col>
                </Row>
                <Row className="p-1 mb-3">
                    {this.state.clusterNodeList.length !== 0 ?
                        <Col sm style={{ maxHeight: '30vh', overflow: 'hidden', overflowY: 'scroll', paddingRight: '0px' }}>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th className="text-left" scope="col">ID</th>
                                        <th className="text-left" scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.clusterNodeList.map(listitem => (
                                        <tr key={listitem.id} onClick={() => this.onClusterNodeClick(listitem.id)} style={listitem.id === this.state.chosenClusterNodeId ? chosenClusterNodeStyle : null}>
                                            <td className="text-left">{listitem.id}</td>
                                            <td className="text-left">{listitem.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                        :
                        <Col sm className="text-center h3 mt-5">
                            There are no cluster nodes assigned to your account.
                    </Col>
                    }

                </Row>
                <ButtonContainer>
                    <Button variant="secondary"
                        block
                        disabled={this.state.chosenClusterNodeId === false}
                        onClick={() => {
                            this.setState({ loading: true});
                            this.submitCluster(this.state.chosenClusterNodeId)
                        }}
                    >
                         Submit cluster node 
                            { this.state.loading &&  
                            <Spinner as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                            /> }
                        </Button>
                    <Button variant="secondary" disabled={!this.state.chosenClusterNodeId} > Safely deactivate </Button>
                    <Button variant="secondary" disabled={!this.state.chosenClusterNodeId} > Details </Button>
                    <Link to={`/computation-resource-management/${this.state.chosenClusterNodeId}/machine-list`} style={{ textDecoration: 'none' }} className="d-flex">
                        <Button variant="secondary" disabled={!this.state.chosenClusterNodeId} className="flex-fill">
                            Machine List
                        </Button>
                    </Link>

                </ButtonContainer>
            </div>
        );
    }
}

export default ClusterNodeList;
