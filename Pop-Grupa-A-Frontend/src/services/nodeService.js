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

function createClusterNode(is_private, user_id, ip_list){
    var createResponse = fetch(`${NODE_URL+"create"}`, {
        crossDomain:  true,
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            is_private: is_private,
            user_id: user_id,
            ip_list: ip_list
          })
    })
    .then(response => {
        return response;
    });
    return createResponse;
}

export {
    submitClusterNode,
    createClusterNode
}