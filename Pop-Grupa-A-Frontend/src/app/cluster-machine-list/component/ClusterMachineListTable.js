import React from 'react';
import Table from '../../common/table/BalticLSCTable';

const ClusterMachineListTable = () => {

    const headers = [
        {name: "ID", field: "id"},
        {name: "Status", field: 'status'}
    ];

    const data = [
        {id: 1, status: "Active"},
        {id: 2, status: "Submitted"}
    ];

    return (
        <Table headers={headers} data={data}/>
    );
};

export default ClusterMachineListTable;