import types from './alertTypes';

const INITIAL_STATE = {
    show: false,
    message: '',
    title: ''
};

const alertReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case types.SHOW_ALERT:
            return {...state, show: true, message: action.payload.message, title: action.payload.title};
        case types.HIDE_ALERT:
            return {...state, show: false, message: '', title: ''};
        default:
            return state;
    }
};

export default alertReducer;