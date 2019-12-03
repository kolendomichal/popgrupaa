import React, { Component } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {withRouter} from "react-router-dom";
import { createClusterNode } from '../../services/nodeService';


class DynamicFormList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isPrivate: false,
            IPTable: [{ machine: "" }]
        };
    }

    handlePrivateChange = evt => {
        this.setState({ isPrivate: evt.target.checked });
    };

    handleMachineIPChange = idx => evt => {
        const newIPTable = this.state.IPTable.map((IP, sidx) => {
            if (idx !== sidx) return IP;
            return { ...IP, machine: evt.target.value };
        });

        this.setState({ IPTable: newIPTable });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { isPrivate, IPTable } = this.state;
        let ip_list = IPTable.map( (IP) => {return IP.machine;});
        createClusterNode(isPrivate,'4',ip_list).then(response => {
            if (response.status == 201){
                this.props.history.push('/computation-resource-management');
            } else {
                alert('Something went wrong!');
            }
        });
    };

    handleAddIP = () => {
        this.setState({
            IPTable: this.state.IPTable.concat([{ machine: "" }])
        });
    };

    handleRemoveIP = idx => () => {
        this.setState({
            IPTable: this.state.IPTable.filter((s, sidx) => idx !== sidx)
        });
    };

    render() {
        return (
            <div>
                <h4>Create new Cluster Node</h4>
                <hr></hr>
                <Row>
                    <Col sm>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="formIP">
                                <Form.Label className="mr-2">List of machines IP addresses:</Form.Label>

                                {this.state.IPTable.map((IP, idx) => (
                                    <div>
                                        <Form.Row>
                                            <Form.Group as={Col} md="10">
                                                <Form.Control
                                                    type="text"
                                                    placeholder={`machine #${idx + 1} IP`}
                                                    value={IP.machine}
                                                    onChange={this.handleMachineIPChange(idx)}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} md="2">
                                                <Button variant="danger"
                                                    type="button"
                                                    onClick={this.handleRemoveIP(idx)}
                                                    className="small"
                                                >

                                                    REMOVE
                                            </Button>
                                            </Form.Group>
                                        </Form.Row>
                                    </div>
                                ))}
                                <Button variant="info"
                                    type="button"
                                    onClick={this.handleAddIP}
                                    className="small"
                                >
                                    Add Next IP
                                  </Button>
                            </Form.Group>
                            <hr></hr>
                            <Form.Group controlId="formPrivate">
                                <Form.Row>
                                    <Form.Label className="mr-2">Is Cluster Private:</Form.Label>
                                    <Form.Check name="private" value={this.state.isPrivate} onChange={this.handlePrivateChange} />
                                </Form.Row>
                            </Form.Group>
                            <Button type="submit" variant="primary" style={{ width: '92%' }} size="lg" >Create -></Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default withRouter(DynamicFormList);