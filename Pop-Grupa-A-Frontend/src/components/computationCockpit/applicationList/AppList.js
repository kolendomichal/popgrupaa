import React, { Component } from 'react';

class AppList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chosenAppId: -1,
      userId: 1,
    };
    this.createTask = this.createTask.bind(this);
  }

  onAppClick = (chosenAppId) => {
    this.setState({ chosenAppId });
  }

  createTask(e) {
    e.preventDefault();
    fetch("http://localhost:5000/task", {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        app_id: this.state.chosenAppI,
        user_id: this.state.userId
      })
    });
  }


  mockedList = {
    listitems: [
      {
        id: 0,
        context: "Test App1",
        author: "Anrzej",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      },
      {
        id: 1,
        context: "Test App2",
        author: "Bartek",
        description: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets"
      },
      {
        id: 2,
        context: "Test App3",
        author: "Michał",
        description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur."
      },
      {
        id: 3,
        context: "Test App4",
        author: "Piotr",
        description: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets"
      },
      {
        id: 4,
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
      <div class="row p-1">
        <div class="col-sm">
          <table class="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th class="text-left" scope="col">Name</th>
                <th class="text-left" scope="col">Author</th>
              </tr>
            </thead>
            <tbody>
              {this.mockedList.listitems.map(listitem => (
                <tr key={listitem.id} onClick={() => this.onAppClick(listitem.id)} style={listitem.id === this.state.chosenAppId ? chosenAppStyle : null} >
                  <td class="text-left">{listitem.context}</td>
                  <td class="text-left">{listitem.author}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div class="col-sm pr-4">
          <div class="row mb-3" style={{ height: "70%" }}>
            <span class={this.state.chosenAppId !== -1 ? "border" : null}>
              <div class="text-left p-3">

                <h4>{this.state.chosenAppId !== -1 && this.mockedList.listitems[this.state.chosenAppId].context}</h4>
                {this.state.chosenAppId !== -1 && this.mockedList.listitems[this.state.chosenAppId].description}

              </div>
            </span>
          </div>
          <div class="row">
            {this.state.chosenAppId !== -1 && <button type="button" class="btn btn-secondary btn-block" onClick={this.createTask} >Create new computation task</button>}
          </div>
        </div>
      </div>
    );
  }
}

export default AppList;