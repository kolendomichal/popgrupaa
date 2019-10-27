import React, { Component } from 'react';

class TaskList extends Component {

    state = {
        listitems: [
            {
                id: 1,
                UID: "f3a-g31fs-gq3tq3-gw52",
                status: "active",
                consumedCredits: "5$",
                startDate: "13-10-2019 14:01:23",
                endDate: "13-10-2019 14:01:23",
            },
            {
                id: 2,
                UID: "f21-g31fs-gq3tq3-gw52",
                status: "finished",
                consumedCredits: "15$",
                startDate: "13-10-2019 14:01:23",
                endDate: "13-10-2019 14:01:23",
            },
            {
                id: 3,
                UID: "532-g31fs-gq3tq3-gw52",
                status: "active",
                consumedCredits: "1$",
                startDate: "13-10-2019 14:01:23",
                endDate: "13-10-2019 14:01:23",
            },
            {
                id: 4,
                UID: "ff3-g31fs-gq3tq3-gw52",
                status: "active",
                consumedCredits: "53$",
                startDate: "13-10-2019 14:01:23",
                endDate: "13-10-2019 14:01:23",
            }
        ]
    };

    render() {
        return (
            <React.Fragment>
                <div className="row p-1">
                    <div className="col-sm">
                        <table className="table table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th className="text-left" scope="col">UID</th>
                                    <th className="text-left" scope="col">Status</th>
                                    <th className="text-left" scope="col">Consumed credits</th>
                                    <th className="text-left" scope="col">Start date</th>
                                    <th className="text-left" scope="col">End date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.listitems.map(listitem => (
                                    <tr key={listitem.id}>
                                        <td className="text-left">{listitem.UID}</td>
                                        <td className="text-left">{listitem.status}</td>
                                        <td className="text-left">{listitem.consumedCredits}</td>
                                        <td className="text-left">{listitem.startDate}</td>
                                        <td className="text-left">{listitem.endDate}</td>
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
            </React.Fragment>
        );
    }
}

export default TaskList;