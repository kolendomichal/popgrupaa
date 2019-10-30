import React, { Component } from 'react';
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
                    </table>
                    <div className="row">
                        <div className="col-sm">
                            <button type="button" className="btn btn-secondary btn-block">Set data store</button>
                        </div>
                        <div className="col-sm">
                            <button type="button" className="btn btn-secondary btn-block">Show details</button>
                        </div>
                        <div className="col-sm">
                            <button type="button" className="btn btn-secondary btn-block">Activate</button>
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