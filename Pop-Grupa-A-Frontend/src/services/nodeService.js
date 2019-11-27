import { NODE_URL } from '../commons/ApiLinks';

function submitClusterNode(nodeId){
    var submitResponse = fetch(`${NODE_URL+nodeId+"/submit"}`, {
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

function getClustersForUser(userId){

    var clusterlist = fetch(NODE_URL +"user/"+ + userId, {
        crossDomain: true,
        method: 'get',
    })
        .then(response => {
            return response.status === 200 ? response.json() : [];
        });

    return clusterlist;
}

export {
    getClustersForUser,
    submitClusterNode
}