import React, { Component } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { getAppsForUser } from '../../services/appService';
import { createTask } from '../../services/taskService';
import { ModalMessege } from '../modalMesseges/MessegingModal';

class AppList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chosenAppId: -1,
      userId: 1,
      appsList: [],
      response: {
        showModal: false,
        title: "",
        message: ""
      } 
    };
  }

  componentDidMount() {
    getAppsForUser(this.state.userId)
    .then(response =>
      this.setState({
        appsList: response
      })
    );
  }

  onModalHide = () => {
    this.setState({ response: { showModal: false } });
  }


  onAppClick = (chosenAppId) => {
    this.setState({ chosenAppId });
  }

  useCreateTask = () => {
      createTask(this.state.chosenAppId, this.state.userId)
      .then(response => {
        this.setState({
          chosenAppId: -1,
          response:{
            showModal: true,
            title: response.status,
            message: response.message
          }
        })
      }).then(() => this.props.tasksShouldRefresh(true))
  }

  render() {
    const { chosenAppId, appsList } = this.state;

    const chosenAppStyle = {
      backgroundColor: "DodgerBlue"
    };

    return (
      <React.Fragment>
        <ModalMessege show={this.state.response.showModal} response={this.state.response} onHide={() => this.onModalHide()}/> 
        <Row className="pl-1 mb-4">
          <Col sm style={{ maxHeight: '40vh', overflow: 'hidden', overflowY: 'scroll', paddingRight: '0px' }}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className="text-left" scope="col">Name</th>
                  <th className="text-left" scope="col">Author</th>
                </tr>
              </thead>
              <tbody>
                {appsList.map(application => (
                  <tr key={application.id} onClick={() => this.onAppClick(application.id)} style={application.id === chosenAppId ? chosenAppStyle : null} >
                    <td className="text-left">{application.name}</td>
                    <td className="text-left">{application.description}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col sm className="r-4 ml-3 mr-4">
            <Row className="mb-3" style={{ height: "32vh" }}>
              <span className={chosenAppId !== -1 ? "border" : null}  style={{ minWidth: '100%' }}>
                <div className="text-left p-3">

                  <h4>{chosenAppId !== -1 && appsList.find(app => app.id === chosenAppId).name}</h4>
                  {chosenAppId !== -1 && appsList.find(app => app.id === chosenAppId).description}

                </div>
              </span>
            </Row>
            <Row>
              {chosenAppId!== -1 && <Button variant="secondary" block onClick={() => this.useCreateTask()} >Create new computation task</Button>}
            </Row>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default AppList;