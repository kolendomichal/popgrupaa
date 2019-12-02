import { clusterUrl, machinesUrl } from '../commons/ApiLinks';

function getClustersForUser(userId){
    
    var clusterlist = fetch(clusterUrl + userId, {
        crossDomain: true,
        method: 'get',
    })
        .then(response => {
            return response.status === 200 ? response.json() : [];
        });

    return clusterlist;
}


function getMachinesForClusterNode(clusterNodeId){
    var machinesList = fetch(machinesUrl + clusterNodeId, {
        crossDomain: true,
        method: 'get',
    })
        .then(response => {
            return response.status === 200 ? response.json() : [];
        });

    return machinesList;
}

export {
    getClustersForUser,
    getMachinesForClusterNode
}
