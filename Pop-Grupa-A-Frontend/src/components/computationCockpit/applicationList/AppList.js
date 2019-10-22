import React, { Component } from 'react';

class AppList extends Component {

  state = {
    listitems: [
      {
        id: 0,
        context: "Test App1",
        author: "Anrzej",
      },
      {
        id: 1,
        context: "Test App2",
        author: "Anrzej",
      },
      {
        id: 2,
        context: "Test App3",
        author: "Anrzej",
      },
      {
        id: 3,
        context: "Test App4",
        author: "Anrzej",
      },
      {
        id: 4,
        context: "Test App5",
        author: "Anrzej",
      }
    ]
  };

  render() {
    return (
      <React.Fragment>
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
                {this.state.listitems.map(listitem => (
                  <tr key={listitem.id}>
                    <td class="text-left">{listitem.context}</td>
                    <td class="text-left">{listitem.author}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div class="col-sm pr-4">
            <div class="row mb-3">
            <span class="border">
            <div class="text-left p-3">
           
                  <h4>Test App2</h4>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lacinia, ante vel fringilla porttitor, tortor eros pharetra magna, ut blandit est lorem id ligula. In hac habitasse platea dictumst. Proin tempus volutpat eros eget commodo. Ut dignissim libero sed tellus auctor, sed iaculis nisl blandit. Morbi arcu diam, dictum sed justo eget, sagittis malesuada est. Morbi commodo convallis suscipit. Morbi enim eros, suscipit quis vestibulum a, pharetra in arcu. Curabitur a consequat est, eu tempor diam.
          
            </div>
            </span>
              </div>
              <div class="row">
              <button type="button" class="btn btn-secondary btn-block">Create new computation task</button>
                </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AppList;