import React from 'react';
import { connect } from 'react-redux';
import alertActions from "../../redux/alert/alertActions";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { createClusterNode } from '../../services/clusterService';
import * as Cookies from 'js-cookie';
import { withRouter } from 'react-router'
import { Status } from "../../commons/Constants";

class DynamicFormList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isPrivate: false,
            IPTable: [{ machine: "" }],
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
                this.props.showModal(response.message, response.status);
                this.props.history.push('/computation-resource-management');
            },
            (error) => {
                this.setState({
                    chosenAppId: -1
                  })
                  this.props.showModal(error.message, Status.Error);
            }
        );
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
            <React.Fragment>
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
            </React.Fragment>
        );
    }
}


const mapDispatchToProps = (dispatch) => ({
    showModal: (message, title) => dispatch(alertActions.showAlert(message, title))
});

export default withRouter(connect(null, mapDispatchToProps)(DynamicFormList));
