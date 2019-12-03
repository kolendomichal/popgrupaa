import { clusterUrl, machinesUrl } from '../commons/ApiLinks';

function getClustersForUser(userId){
    
    var clusterlist = fetch(clusterUrl+"user/" + userId, {
        crossDomain: true,
        method: 'get',
    })
        .then(response => {
            return response.status === 200 ? response.json() : [];
        });

    return clusterlist;
}

function submitClusterNode(nodeId){
    var submitResponse = fetch(`${clusterUrl+nodeId+"/submit"}`, {
        crossDomain:  true,
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(response => {
        return response;
    });
    return submitResponse;
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
    getMachinesForClusterNode,
    submitClusterNode
}
