import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {withRouter} from "react-router-dom";
import { createClusterNode } from '../../services/clusterService';
import { ModalMessege } from '../modalMesseges/MessegingModal';
import * as Cookies from 'js-cookie';

class DynamicFormList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isPrivate: false,
            IPTable: [{ machine: "" }],
            response: {
                showModal: false,
                title: "",
                message: ""
            },
            userId: Cookies.get("userId")
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
        const { isPrivate, IPTable, userId } = this.state;
        let ip_list = IPTable.map( (IP) => {return IP.machine;});
        createClusterNode(isPrivate, userId ,ip_list)
        .then(
            (response) => {
                this.setState({
                    response:{
                      showModal: true,
                      title: response.status,
                      message: response.message
                    }
                })
            },
            (error) => {
                this.setState({
                    chosenAppId: -1,
                    response:{
                      showModal: true,
                      title: "Error",
                      message: error.message
                    }
                  })
            }
        );
    };

    onModalHide = () => {
        this.setState({ response: { showModal: false } });
        if(this.state.response.title !== "Error"){
            this.props.history.push('/computation-resource-management');
        }
    }

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
                <ModalMessege show={this.state.response.showModal} response={this.state.response} onHide={() => this.onModalHide()}/> 
                <h4>Create new Cluster Node</h4>
                <hr></hr>
                <Row>
                    <Col sm>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="formIP">
                                <Form.Label className="mr-2">List of machines IP addresses:</Form.Label>

                                {this.state.IPTable.map((IP, idx) => (
                                    <div key={idx}>
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