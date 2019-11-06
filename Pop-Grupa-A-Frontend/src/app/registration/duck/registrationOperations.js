import {createRequestAction} from "../../utils";

const sendRegisterRequest = (formValues) => (dispatch) => {
  const requestObject = {
    url: `/register`, // fixme put registration path here
    method: 'POST',
    body: {...formValues} // fixme add success handler
  };
  dispatch(createRequestAction(requestObject));
};

export default {
  sendRegisterRequest
}