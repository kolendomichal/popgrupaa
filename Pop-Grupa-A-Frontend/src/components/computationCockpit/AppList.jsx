import React, { Component } from 'react';
import { taskUrl } from '../../commons/ApiLinks';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { getAppsForUser } from '../../services/appService';

class AppList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chosenAppId: -1,
      userId: 1,
      appsList: []
    };
  }

  getApps() {
    getAppsForUser(this.state.userId)
      .then(response =>
        this.setState({
          appsList: response
        })
      );
  }

  componentDidMount() {
    this.getApps();
  }


  onAppClick = (chosenAppId) => {
    this.setState({ chosenAppId });
  }

  createTask = () => {
    fetch(taskUrl, {
      crossDomain: true,
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        app_id: this.state.chosenAppId,
        user_id: this.state.userId
      })
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          chosenAppId: -1
        })
        alert(response.message);
      }).then(() => this.props.tasksShouldRefresh(true))
  }

  render() {
    var appId = this.state.chosenAppId;

    const chosenAppStyle = {
      backgroundColor: "DodgerBlue"
    };

    return (
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
              {this.state.appsList.map(listitem => (
                <tr key={listitem.id} onClick={() => this.onAppClick(listitem.id)} style={listitem.id === appId ? chosenAppStyle : null} >
                  <td className="text-left">{listitem.name}</td>
                  <td className="text-left">{listitem.description}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col sm className="r-4 ml-3 mr-4">
          <Row className="mb-3" style={{ height: "32vh" }}>
            <span className={this.state.chosenAppId !== -1 ? "border" : null}  style={{ minWidth: '100%' }}>
              <div className="text-left p-3">

                <h4>{this.state.chosenAppId !== -1 && this.state.appsList.find(app => app.id === appId).name}</h4>
                {this.state.chosenAppId !== -1 && this.state.appsList.find(app => app.id === appId).description}

              </div>
            </span>
          </Row>
          <Row>
            {this.state.chosenAppId !== -1 && <Button variant="secondary" block onClick={() => this.createTask()} >Create new computation task</Button>}
          </Row>
        </Col>
      </Row>
    );
  }
}

export default AppList;