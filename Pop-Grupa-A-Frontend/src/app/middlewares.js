export const requestActionMiddleware = ({dispatch}) => next => action => {
    if(!action.fetchAction) {
        return next(action);
    }
    return action.payload.then(resp => resp.json()).then(data => {
        dispatch({type: action.types.PENDING});

        if(data.error) {
            alert(data.error);
            dispatch({type: action.types.REJECTED});
            return Promise.reject();
        }
        dispatch({
            type: action.type.FULFILLED,
            payload: action.successHandler(data.resposne)
        });
        return Promise.resolve(action.successHandler(data.response))
    }).catch(error => {
        alert(error);
        dispatch({type: action.types.REJECTED});
        return Promise.reject(error);
    })
};