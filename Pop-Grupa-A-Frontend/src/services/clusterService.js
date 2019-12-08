import { CLUSTER_URL, MACHINES_URL } from '../commons/ApiLinks';

function getClustersForUser(userId){
    
    var clusterlist = fetch(CLUSTER_URL+"user/" + userId, {
        crossDomain: true,
        method: 'get',
    })
        .then(response => {
            return response.status === 200 ? response.json() : [];
        });

    return clusterlist;
}

function submitClusterNode(nodeId){
    var submitResponse = fetch(`${CLUSTER_URL+nodeId+"/submit"}`, {
        crossDomain:  true,
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(response => {
        if (response.status === "Success") {
            return response;
        } else {
            throw new Error(response.message);
        }
    });
    return submitResponse;
}

function getMachinesForClusterNode(clusterNodeId){
    var machinesList = fetch(MACHINES_URL + clusterNodeId, {
        crossDomain: true,
        method: 'get',
    })
        .then(response => {
            return response.status === 200 ? response.json() : [];
        });

    return machinesList;
}

function createClusterNode(is_private, user_id, ip_list){
    var createResponse = fetch(`${CLUSTER_URL+"create"}`, {
        crossDomain:  true,
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            is_private: is_private,
            user_id: user_id,
            ip_list: ip_list
          })
    })
    .then(response => response.json())
    .then(response => {
        if (response.status === "Success") {
            return response;
        } else {
            throw new Error(response.message);
        }
    });
    return createResponse;
}

export {
    getClustersForUser,
    getMachinesForClusterNode,
    submitClusterNode,
    createClusterNode
}
