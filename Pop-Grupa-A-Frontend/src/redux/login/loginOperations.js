import {createRequestAction} from "../utils";
import types from './loginTypes';
import {UserIdPath, RolePath, Role} from "../../commons/Constants";
import * as Cookies from 'js-cookie';

const sendLoginRequest = (formValues) => (dispatch) => {
    return dispatch(createRequestAction({
        types: types.FETCH_LOGIN_INFO,
        url: `/user/login`,
        method: 'POST',
        body: {...formValues},
        successHandler: data => {
            Cookies.set(UserIdPath, data.user_id);
            Cookies.set(RolePath, data.role);
            const uri = data.role === Role.Supplier.code ? "/computation-resource-management" : "/computation-cockpit";
            return {payload: uri};
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
            window.location.reload();
            return ({payload: true});
        }
    }))
};

export default {
    sendLoginRequest,
    sendLogoutRequest
}