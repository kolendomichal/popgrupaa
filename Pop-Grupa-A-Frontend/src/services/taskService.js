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

activateTask = () => {
    fetch(taskUrl, {
      crossDomain:  true,
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        task_id: this.state.chosenTaskId,
      })
    })
    .then(response => response.json())
    .then(response => {
      alert(response.message);
    }).then(() => this.props.tasksShouldRefresh(true))
  }


export {
    getTasksForUser, activateTask
}