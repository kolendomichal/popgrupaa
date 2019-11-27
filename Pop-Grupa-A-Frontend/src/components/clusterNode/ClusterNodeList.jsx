import React, { Component } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { getClustersForUser, submitClusterNode } from '../../services/nodeService';

class ClusterNodeList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chosenClusterNodeId: -1,
            listitems: [],
            userId: 1
        };
    }

    onClusterClick = (chosenClusterNodeId) => {
        this.setState({ chosenClusterNodeId });
    }

    getClusters() {
        getClustersForUser(this.state.userId)
            .then(response =>
                this.setState({
                    listitems: response
                })
            );
    }

    submitCluster() {
        submitClusterNode(this.state.chosenClusterNodeId)
            .then(response =>{
                alert(response)
                this.setState({
                    listitems : this.getClusters()
                })
            });
    }

    componentDidMount(){
        this.setState({
            listitems : this.getClusters()
        })
        console.log(this.state.listitems)
    }

    render() {
        const { chosenClusterNodeId} = this.state;
        const chosenClusterNodeStyle = {
            backgroundColor: "DodgerBlue"
          };
        return (
            <div>
                <Row>
                    <Col sm>
                        {<Button variant="secondary" 
                        block 
                        disabled = {chosenClusterNodeId === -1}
                        onClick={() => this.submitCluster(chosenClusterNodeId)}
                        >Submit cluster node</Button> }
                    </Col>
                    <Col sm>
                        <Button variant="secondary" block>Create new cluster node</Button>
                    </Col>
                    <Col sm>
                        <Button variant="secondary" block>Show credit statistics</Button>
                    </Col>
                </Row>
                <Row className="p-1 mb-3">
                    <Col sm style={{ maxHeight: '30vh', overflow: 'hidden', overflowY: 'scroll', paddingRight: '0px' }}>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th className="text-left" scope="col">ID</th>
                                    <th className="text-left" scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.listitems ? this.state.listitems.map(listitem => (
                                    <tr key={listitem.id} onClick={() => this.onClusterClick(listitem.id)} style={listitem.id === this.state.chosenClusterNodeId ? chosenClusterNodeStyle : null}>
                                        <td className="text-left">{listitem.id}</td>
                                        <td className="text-left">{listitem.status}</td>
                                    </tr>
                                )) : null}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ClusterNodeList;