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

export default {
    sendLoginRequest
}