import React from 'react';
import Table from '../../common/table/BalticLSCTable';

const ClusterMachineListTable = ({data, onRowClick}) => {

    const headers = [
        {name: "ID", field: "id", onClick: onRowClick},
        {name: "Status", field: 'status', onClick: onRowClick}
    ];

    return (
        <Table headers={headers} data={data}/>
    );
};

export default ClusterMachineListTable;