import React, { Component } from 'react';
import { taskUrl } from '../../commons/ApiLinks';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

class AppList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chosenAppId: -1,
      userId: 1,
    };
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


  mockedList = {
    listitems: [
      {
        id: 1,
        context: "Test App1",
        author: "Anrzej",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      },
      {
        id: 2,
        context: "Test App2",
        author: "Bartek",
        description: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets"
      },
      {
        id: 3,
        context: "Test App3",
        author: "Michał",
        description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classNameical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur."
      },
      {
        id: 4,
        context: "Test App4",
        author: "Piotr",
        description: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets"
      },
      {
        id: 5,
        context: "Test App5",
        author: "Filip",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      }
    ]
  };



  render() {

    const chosenAppStyle = {
      backgroundColor: "DodgerBlue"
    };

    return (
      <Row className="p-1">
        <Col sm>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="text-left" scope="col">Name</th>
                <th className="text-left" scope="col">Author</th>
              </tr>
            </thead>
            <tbody>
              {this.mockedList.listitems.map(listitem => (
                <tr key={listitem.id} onClick={() => this.onAppClick(listitem.id)} style={listitem.id === this.state.chosenAppId ? chosenAppStyle : null} >
                  <td className="text-left">{listitem.context}</td>
                  <td className="text-left">{listitem.author}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col sm className="r-4">
          <Row className="mb-3" style={{ height: "70%" }}>
            <span className={this.state.chosenAppId !== -1 ? "border" : null}>
              <div className="text-left p-3">

                <h4>{this.state.chosenAppId !== -1 && this.mockedList.listitems[this.state.chosenAppId - 1].context}</h4>
                {this.state.chosenAppId !== -1 && this.mockedList.listitems[this.state.chosenAppId - 1].description}

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