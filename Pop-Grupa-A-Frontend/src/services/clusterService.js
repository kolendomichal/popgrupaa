import { clusterUrl } from '../commons/ApiLinks';

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

export {
    getClustersForUser
}
