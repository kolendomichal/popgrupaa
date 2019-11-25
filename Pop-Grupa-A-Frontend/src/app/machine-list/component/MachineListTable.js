import React from 'react';
import BalticLSCTable from '../../common/table/BalticLSCTable';

const MachineListTable = () => {
    const headers = [
        {name: "ID", field: "id"},
        {name: "GPUs", field: 'gpuName'},
        {name: "IP Address", field: 'ip'},
        {name: "Cluster Node ID", field: 'clusterNodeId'}
    ];
    const data = [
        {id: 1, gpuName: "Nvidia GeForce GTX 1050", ip: '192.168.1.4', clusterNodeId:3},
        {id: 1, gpuName: "Nvidia GeForce GTX 1050", ip: '192.168.1.4', clusterNodeId:3},
        {id: 1, gpuName: "Nvidia GeForce GTX 1050", ip: '192.168.1.4', clusterNodeId:3},
        {id: 1, gpuName: "Nvidia GeForce GTX 1050", ip: '192.168.1.4', clusterNodeId:3},
        {id: 1, gpuName: "Nvidia GeForce GTX 1050", ip: '192.168.1.4', clusterNodeId:3},
        {id: 1, gpuName: "Nvidia GeForce GTX 1050", ip: '192.168.1.4', clusterNodeId:3},
        {id: 1, gpuName: "Nvidia GeForce GTX 1050", ip: '192.168.1.4', clusterNodeId:3},
        {id: 1, gpuName: "Nvidia GeForce GTX 1050", ip: '192.168.1.4', clusterNodeId:3},
        {id: 1, gpuName: "Nvidia GeForce GTX 1050", ip: '192.168.1.4', clusterNodeId:3},
        {id: 1, gpuName: "Nvidia GeForce GTX 1050", ip: '192.168.1.4', clusterNodeId:3}
    ];

    return (
        <BalticLSCTable headers={headers} data={data} />
    )
};

export default MachineListTable;