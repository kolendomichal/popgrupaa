import React, { Component } from 'react';
import { getTasksForUser } from '../../services/taskService';
import { taskUrl } from '../../commons/ApiLinks';

class TaskList extends Component {

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
          alert(response.message);
        }).then(() => this.props.tasksShouldRefresh(true))
      }

    onTaskClick = (chosenTaskId) => {
    this.setState({ chosenTaskId });
    }

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


    const chosenTaskStyle = {
        backgroundColor: "DodgerBlue"
      };
  

        return (
            <div className="row p-1">
                <div className="col-sm">
                    <table className="table table-striped table-bordered table-hover">
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
                    </table>
                    <div className="row">
                        <div className="col-sm">
                            <button type="button" className="btn btn-secondary btn-block">Set data store</button>
                        </div>
                        <div className="col-sm">
                            <button type="button" className="btn btn-secondary btn-block">Show details</button>
                        </div>
                        <div className="col-sm">
                        {this.state.chosenTaskId !== -1 && <button type="button" className="btn btn-secondary btn-block" onClick={() => this.activateTask()} >Activate</button>}
                        </div>
                        <div className="col-sm">
                            <button type="button" className="btn btn-secondary btn-block">Pause</button>
                        </div>
                        <div className="col-sm">
                            <button type="button" className="btn btn-secondary btn-block">Abort</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TaskList;