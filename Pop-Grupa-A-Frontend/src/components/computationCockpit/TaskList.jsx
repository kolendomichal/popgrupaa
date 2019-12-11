import React, { Component } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { getTasksForUser, activateTask } from '../../services/taskService';
import { ModalMessege } from '../modalMesseges/MessegingModal';
import * as Cookies from 'js-cookie';

class TaskList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chosenTaskId: -1,
            listitems: [],
            response: {
                showModal: false,
                title: "",
                message: ""
            },
            userId: Cookies.get("userId")
        };
    }

    onTaskClick = (chosenTaskId) => {
        this.setState({ chosenTaskId });
    }

    onModalHide = () => {
        this.setState({ response: { showModal: false } });
    }
    
    useActivateTask = () => {
        activateTask(this.state.chosenTaskId)
        .then(response => {
            this.setState({
                chosenTaskId: -1,
                response:{
                    showModal: true,
                    title: response.status,
                    message: response.message
                }
            })
        }).then(() => this.props.tasksShouldRefresh(true))
    }

    getTasks() {
        getTasksForUser(this.state.userId)
            .then(response =>
                this.setState({
                    listitems: response
                })
            );
    }

    componentDidMount() {
        this.getTasks();
    }

    componentDidUpdate() {
        if (this.props.newTaskCreated === true) {
            this.getTasks();
            this.props.tasksShouldRefresh(false);
        }
    }


    render() {
        const { chosenTaskId} = this.state;

        const chosenTaskStyle = {
            backgroundColor: "DodgerBlue"
          };

        return (
            <div>
                <ModalMessege show={this.state.response.showModal} response={this.state.response} onHide={() => this.onModalHide()}/> 
                <Row className="p-1 mb-3">
                    <Col sm style={{ maxHeight: '30vh', overflow: 'hidden', overflowY: 'scroll', paddingRight: '0px' }}>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th className="text-left" scope="col">UID(id)</th>
                                    <th className="text-left" scope="col">Status</th>
                                    <th className="text-left" scope="col">Consumed credits</th>
                                    <th className="text-left" scope="col">Start date</th>
                                    <th className="text-left" scope="col">End date</th>
                                    <th className="text-left" scope="col">App</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.listitems.map(listitem => (
                                    <tr key={listitem.id} onClick={() => this.onTaskClick(listitem.id)} style={listitem.id === this.state.chosenTaskId ? chosenTaskStyle : null}>
                                        <td className="text-left">{listitem.id}</td>
                                        <td className="text-left">{listitem.status}</td>
                                        <td className="text-left">$</td>
                                        <td className="text-left">{listitem.start_date}</td>
                                        <td className="text-left">{listitem.end_date}</td>
                                        <td className="text-left">{listitem.app_name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col sm>
                        <Button variant="secondary" block>Set data store</Button>
                    </Col>
                    <Col sm>
                        <Button variant="secondary" block>Show details</Button>
                    </Col>
                    <Col sm>
                        {<Button variant="secondary" block onClick={() => chosenTaskId!== -1 && this.useActivateTask()}>Activate</Button> }
                    </Col>
                    <Col sm>
                        <Button variant="secondary" block>Pause</Button>
                    </Col>
                    <Col sm>
                        <Button variant="secondary" block>Abort</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default TaskList;
