import {createRequestAction} from "../../utils";
import actions from './loginActions';

const sendLoginRequest = (formValues) => (dispatch) => {
  const requestObject = {
    url: `/`, // fixme login path here
    method: 'POST',
    body: {...formValues},
    successHandler: actions.successfulLogin
  };
  dispatch(createRequestAction(requestObject));
};

export default {
  sendLoginRequest
}