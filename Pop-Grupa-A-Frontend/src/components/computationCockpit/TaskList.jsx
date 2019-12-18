import React, { Component } from 'react';
import { connect } from 'react-redux';
import alertActions from "../../redux/alert/alertActions";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { getTasksForUser, activateTask } from '../../services/taskService';
import * as Cookies from 'js-cookie';

class TaskList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chosenTaskId: -1,
            listitems: [],
            userId: Cookies.get("userId")
        };
    }

    onTaskClick = (chosenTaskId) => {
        this.setState({ chosenTaskId });
    }
    
    useActivateTask = () => {
        activateTask(this.state.chosenTaskId)
        .then(response => {
            this.setState({
                chosenTaskId: -1
            })
            this.props.showModal(response.message, response.status);
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
            <React.Fragment>
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
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    showModal: (message, title) => dispatch(alertActions.showAlert(message, title))
  });
  
  export default connect(null, mapDispatchToProps)(TaskList);
