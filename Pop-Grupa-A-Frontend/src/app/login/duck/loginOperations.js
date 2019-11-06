import {createRequestAction} from "../../utils";
import types from './loginTypes';

const sendLoginRequest = (formValues) => (dispatch) => {
    const requestObject = {
        types: types.FETCH_LOGIN_INFO,
        url: `/user/login`,
        method: 'POST',
        body: {...formValues},
        successHandler: null // fixme
    };
    dispatch(createRequestAction(requestObject));
};

export default {
    sendLoginRequest
}