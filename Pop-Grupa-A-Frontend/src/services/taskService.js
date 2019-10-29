import { taskUrl } from '../commons/ApiLinks';

function getTasksForUser(userId){
    
    var tasklist = fetch(taskUrl + userId, {
        crossDomain: true,
        method: 'get',
    })
        .then(response => response.json())
        .then(response => {
            return response;
        });

    return tasklist;
}


export {
    getTasksForUser
}