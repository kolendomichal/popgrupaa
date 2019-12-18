import types from './alertTypes';

const showAlert = (message, title) => ({
    type: types.SHOW_ALERT,
    payload: { 
        message,
        title
    }
});

const hideAlert = () => ({
    type: types.HIDE_ALERT
});

export default {
    showAlert,
    hideAlert
}