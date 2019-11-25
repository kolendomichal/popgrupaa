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

export {
    submitClusterNode
}