import React, { Component } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { getTasksForUser } from '../../services/taskService';

class TaskList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listitems: [],
            userId: 1
        };
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
        if(this.props.newTaskCreated === true) {
            this.getTasks();
            this.props.tasksShouldRefresh(false);
        }
    }

    render() {
        return (
            <Row className="p-1">
                <Col sm>
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
                                <tr key={listitem.id}>
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
                    <Row>
                        <Col sm>
                            <Button variant="secondary" block>Set data store</Button>
                        </Col>
                        <Col sm>
                            <Button variant="secondary" block>Show details</Button>
                        </Col>
                        <Col sm>
                            <Button variant="secondary" block>Activate</Button>
                        </Col>
                        <Col sm>
                            <Button variant="secondary" block>Pause</Button>
                        </Col>
                        <Col sm>
                            <Button variant="secondary" block>Abort</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default TaskList;