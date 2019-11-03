from app.main import db
from app.main.model.ComputationTask import ComputationTask
from app.main.model.ComputationStatus import ComputationStatus
from app.main.model.ComputationAccount import ComputationAccount
from app.main.model.ComputationApplication import ComputationApplication


def get_tasks_for_user(userId):
    return ComputationTask.query.filter_by(user_id=userId).all()

<<<<<<< HEAD
    
=======
def update_task(task):
    try:
        save_changes(task)
        return task, 200
    except:
        response_object = {
            'status': 'failure',
            'message': 'Coundn\'t update task'
        }
        return response_object, 400
    

>>>>>>> 6cc5219dd3dbd5e8083829055b153a0958ad5fb5
def save_changes(data):
    db.session.add(data)
    db.session.commit()
