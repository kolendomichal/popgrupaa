import types from './alertTypes';

const showAlert = (message) => ({
    type: types.SHOW_ALERT,
    payload: message
});

const hideAlert = () => ({
    type: types.HIDE_ALERT
});

export default {
    showAlert,
    hideAlert
}