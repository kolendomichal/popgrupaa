import {createRequestAction} from "../../utils";
import types from './loginTypes';
import {UserIdPath} from "../../constants";
import * as Cookies from 'js-cookie';

const sendLoginRequest = (formValues) => (dispatch) => {
    return dispatch(createRequestAction({
        types: types.FETCH_LOGIN_INFO,
        url: `/user/login`,
        method: 'POST',
        body: {...formValues},
        successHandler: data => {
            Cookies.set(UserIdPath, data.user_id);
            return {payload: true};
        }
    }));
};

const sendLogoutRequest = () => (dispatch) => {
    return dispatch(createRequestAction({
        types: types.LOGOUT_REQUEST,
        url: `/user/logout`,
        method: 'POST',
        body: {},
        successHandler: () => {
            Cookies.remove(UserIdPath);
            return ({payload: true});
        }
    }))
};

export default {
    sendLoginRequest,
    sendLogoutRequest
}