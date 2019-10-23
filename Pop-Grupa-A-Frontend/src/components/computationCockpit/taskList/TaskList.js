import React, { Component } from 'react';

class TaskList extends Component {

    state = {
        listitems: [
            {
                id: 0,
                UID: "f3a-g31fs-gq3tq3-gw52",
                status: "active",
                consumedCredits: "5$",
                startDate: "13-10-2019 14:01:23",
                endDate: "13-10-2019 14:01:23",
            },
            {
                id: 0,
                UID: "f21-g31fs-gq3tq3-gw52",
                status: "finished",
                consumedCredits: "15$",
                startDate: "13-10-2019 14:01:23",
                endDate: "13-10-2019 14:01:23",
            },
            {
                id: 0,
                UID: "532-g31fs-gq3tq3-gw52",
                status: "active",
                consumedCredits: "1$",
                startDate: "13-10-2019 14:01:23",
                endDate: "13-10-2019 14:01:23",
            },
            {
                id: 0,
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
                <div class="row p-1">
                    <div class="col-sm">
                        <table class="table table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th class="text-left" scope="col">UID</th>
                                    <th class="text-left" scope="col">Status</th>
                                    <th class="text-left" scope="col">Consumed credits</th>
                                    <th class="text-left" scope="col">Start date</th>
                                    <th class="text-left" scope="col">End date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.listitems.map(listitem => (
                                    <tr key={listitem.id}>
                                        <td class="text-left">{listitem.UID}</td>
                                        <td class="text-left">{listitem.status}</td>
                                        <td class="text-left">{listitem.consumedCredits}</td>
                                        <td class="text-left">{listitem.startDate}</td>
                                        <td class="text-left">{listitem.endDate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div class="row">
                            <div class="col-sm">
                                <button type="button" class="btn btn-secondary btn-block">Set data store</button>
                            </div>
                            <div class="col-sm">
                                <button type="button" class="btn btn-secondary btn-block">Show details</button>
                            </div>
                            <div class="col-sm">
                                <button type="button" class="btn btn-secondary btn-block">Activate</button>
                            </div>
                            <div class="col-sm">
                                <button type="button" class="btn btn-secondary btn-block">Pause</button>
                            </div>
                            <div class="col-sm">
                                <button type="button" class="btn btn-secondary btn-block">Abort</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default TaskList;