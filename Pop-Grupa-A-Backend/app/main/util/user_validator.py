from app.main.services.user_service import get_role_of_current_user

def roles_required(*roles):
    def decorator(function):
        def wrapper(*args, **kwargs):
            role = get_role_of_current_user()
            if role in str(roles):
                return function(*args, **kwargs)
            else:
                return {'message': 'Unauthorized'}, 403
        return wrapper
    return decorator