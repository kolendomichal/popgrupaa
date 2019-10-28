from app.main.model.ComputationTask import ComputationTask
from app.main.model.ComputationStatus import ComputationStatus
from app.main.model.ComputationAccount import ComputationAccount
from app.main.model.ComputationApplication import ComputationApplication
import app.main.repositories.task_repository as task_repository

def add_task(task):
    db_user = ComputationAccount.query.filter_by(id=task['user_id']).first()
    db_app = ComputationApplication.query.filter_by(id=task['app_id']).first()

    if db_user and db_app:
        new_task = ComputationTask(
            status = ComputationStatus.SUBMITTED.value,
            user_id = task['user_id'],
            app_id = task['app_id']
        )

        task_repository.save_changes(new_task)

        return 0
     
    if not db_user:
        return 1
    
    return 2


def get_tasks_for_user(userId):
    return task_repository.get_tasks_for_user(userId=userId)
