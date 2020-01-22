import { TASK_URL } from '../commons/ApiLinks';

function getTasksForUser(userId){
    
    var tasklist = fetch(TASK_URL + userId, {
        crossDomain: true,
        method: 'get',
        credentials: 'include'
    })
        .then(response => {
            return response.status === 200 ? response.json() : [];
        });

    return tasklist;
}

function createTask(appId, userId){
    var createResponse = fetch(TASK_URL, {
        crossDomain: true,
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          app_id: appId,
          user_id: parseInt(userId)
        })
      })
        .then(response => response.json())
        .then(response => {
            return response;
        });
    
        return createResponse;
}

function activateTask(taskId){
    
    var activateResponse = fetch(`${TASK_URL+taskId}/activate`, {
        crossDomain:  true,
        method: 'post',
        credentials: 'include',
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