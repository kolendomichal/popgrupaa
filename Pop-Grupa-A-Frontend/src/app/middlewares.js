import {Status, UserIdPath} from "./constants";
import loginActions from './login/duck/loginActions';
import alertActions from './common/alert/duck/alertActions';

export const requestActionMiddleware = ({dispatch}) => next => action => {
    if (!action.fetchAction) {
        return next(action);
    }

    dispatch({type: action.types.PENDING});

    return action.payload.then(response => {
        if(response.status === 409) {
            const message = "Username or email are already used";
            dispatch(alertActions.showAlert(message));
            dispatch({type: action.types.REJECTED});
            return Promise.reject(message);
        } else if(response.status === 406) {
            dispatch(alertActions.showAlert("Unauthorized"));
            return Promise.reject("Unauthorized");
        }
        return response.json();
    }).then(data => {
        if (data.status === Status.Fail) {
            dispatch(alertActions.showAlert(data.message));
            dispatch({type: action.types.REJECTED});
            return Promise.reject(data.message);
        }
        if (data.status === Status.Success) {
            dispatch({
                type: action.types.FULFILLED,
                payload: action.successHandler(data)
            });
            return Promise.resolve(action.successHandler(data))
        }
    }).catch(error => {
        dispatch(alertActions.showAlert(error));
        dispatch({type: action.types.REJECTED});
        return Promise.reject(error);
    })
};