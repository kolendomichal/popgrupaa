import { taskUrl } from '../commons/ApiLinks';

function getTasksForUser(userId){
    
    var tasklist = fetch(taskUrl + userId, {
        crossDomain: true,
        method: 'get',
    })
        .then(response => {
            return response.status === 200 ? response.json() : [];
        });

    return tasklist;
}

function createTask(appId, userId){

    var createResponse = fetch(taskUrl, {
        crossDomain: true,
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          app_id: appId,
          user_id: userId
        })
      })
        .then(response => response.json())
        .then(response => {
            return response;
        });
    
        return createResponse;
}

function activateTask(taskId){
    
    var activateResponse = fetch(`${taskUrl+taskId}`, {
        crossDomain:  true,
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(response => {
        return response;
    });

    return activateResponse;
}



export {
    getTasksForUser,
    createTask,
    activateTask
}