import React, { Component } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
class DynamicFormList extends React.Component {

    constructor() {
        super();
        this.state = {
            isPrivate: false,
            IPTable: [{ machine: "" }]
        };
    }

    handlePrivateChange = evt => {
        console.log(evt.target.checked)
        this.setState({ isPrivate: evt.target.checked });
    };

    handleMachineIPChange = idx => evt => {
        const newIPTable = this.state.IPTable.map((IP, sidx) => {
            if (idx !== sidx) return IP;
            return { ...IP, machine: evt.target.value };
        });

        this.setState({ IPTable: newIPTable });
    };

    handleSubmit = evt => {
        const { isPrivate, IPTable } = this.state;
        alert(`Form: ${isPrivate} with ${IPTable.length} IPTable`);
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
                            <Button variant="primary" style={{ width: '92%' }} size="lg" onClick={this.handleSubmit}>Create -></Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default DynamicFormList;