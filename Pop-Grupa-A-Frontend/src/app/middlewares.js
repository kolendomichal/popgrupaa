import {Status, UserIdPath} from "./constants";
import loginActions from './login/duck/loginActions';

export const requestActionMiddleware = ({dispatch}) => next => action => {
    if (!action.fetchAction) {
        return next(action);
    }

    dispatch({type: action.types.PENDING});

    return action.payload.then(response => {
        if(response.status === 409) {
            const message = "Username or email are already used";
            alert(message);
            dispatch({type: action.types.REJECTED});
            return Promise.reject(message);
        } else if(response.status === 403 || response.status === 406) {
            localStorage.removeItem(UserIdPath);
            return Promise.reject("Unauthorized");
        }
        return response.json();
    }).then(data => {
        if (data.status === Status.Fail) {
            alert(data.messege);
            dispatch({type: action.types.REJECTED});
            return Promise.reject(data.messege);
        }
        if (data.status === Status.Success) {
            dispatch({
                type: action.types.FULFILLED,
                payload: action.successHandler(data)
            });
            return Promise.resolve(action.successHandler(data))
        }
    }).catch(error => {
        alert(error);
        dispatch({type: action.types.REJECTED});
        return Promise.reject(error);
    })
};