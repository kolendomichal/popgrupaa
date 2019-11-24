import {Status} from "./constants";


export const requestActionMiddleware = ({dispatch}) => next => action => {
    if (!action.fetchAction) {
        return next(action);
    }

    dispatch({type: action.types.PENDING});

    return action.payload.then(response => response.json()).then(data => {
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