
import app.main.repositories.application_repository as application_repository



def get_all_applications():
    applications_list = application_repository.get_all_applications()
    status_code = 204 if len(applications_list) == 0 else 200
    return applications_list , status_code