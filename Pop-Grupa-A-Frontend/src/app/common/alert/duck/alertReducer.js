import types from './alertTypes';

const INITIAL_STATE = {
    show: false,
    message: ''
};

const alertReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case types.SHOW_ALERT:
            return {...state, show: true, message: action.payload};
        case types.HIDE_ALERT:
            return {...state, show: false, message: ''};
        default:
            return state;
    }
};

export default alertReducer;