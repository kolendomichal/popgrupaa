import React from 'react';
import MachineListTable from './MachineListTable';


const MachineListHeader = (props) => {
    const headers = [
        {name: "ID", field: "id"},
        {name: "GPUs", field: 'gpus'},
        {name: "CPUs", field: 'cpus'},
        {name: "IP Address", field: 'ip_address'}
    ];
    
    return (
        <MachineListTable headers={headers} data={props.data} />
    )
};

export default MachineListHeader;