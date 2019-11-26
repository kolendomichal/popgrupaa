import {createRequestAction} from "../../utils";
import types from './loginTypes';

const sendLoginRequest = (formValues) => (dispatch) => {
    return dispatch(createRequestAction({
        types: types.FETCH_LOGIN_INFO,
        url: `/user/login`,
        method: 'POST',
        body: {...formValues},
        successHandler: () => ({payload:true})
    }));
};

const sendLogoutRequest = () => (dispatch) => {
    return dispatch(createRequestAction({
        types: types.LOGOUT_REQUEST,
        url: `/user/logout`,
        method: 'POST',
        body: {},
        successHandler: () => ({payload:true})
    }))
};

export default {
    sendLoginRequest,
    sendLogoutRequest
}