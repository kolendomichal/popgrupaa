import {createRequestAction} from "../../utils";
import types  from './registrationTypes';

const sendRegisterRequest = (formValues) => (dispatch) => {
    const requestObject = {
        types: types.SEND_REGISTRATION_DATA,
        url: `/user/register`,
        method: 'POST',
        body: {...formValues},
        successHandler: data => console.log(data)
    };
    dispatch(createRequestAction(requestObject));
};

export default {
    sendRegisterRequest
}