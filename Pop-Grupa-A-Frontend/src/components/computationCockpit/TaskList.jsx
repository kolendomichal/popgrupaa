import React, { Component } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { getTasksForUser } from '../../services/taskService';
import { taskUrl } from '../../commons/ApiLinks';

class TaskList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chosenTaskId: -1,
            listitems: [],
            userId: 1
        };
    }

    onTaskClick = (chosenTaskId) => {
        this.setState({ chosenTaskId });
        }
    
    activateTask = () => {
        fetch(taskUrl, {
            crossDomain:  true,
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            task_id: this.state.chosenTaskId,
            })
        })
        .then(response => response.json())
        .then(response => {
            this.setState({
            chosenTaskId: -1
            })
            alert(response.message);
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
                                    <th className="text-left" scope="col">AppId</th>
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
                                        <td className="text-left">{listitem.app_id}</td>
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
                        {<Button variant="secondary" block onClick={() => chosenAppId!== -1 && this.activateTask()}>Activate</Button> }
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