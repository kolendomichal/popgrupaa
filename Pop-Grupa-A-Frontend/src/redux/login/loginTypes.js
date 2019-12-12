import {createFetchActionTypes} from "../utils";

const SUCCESSFUL_LOGIN = "SUCCESSFUL_LOGIN";

const FETCH_LOGIN_INFO = createFetchActionTypes("FETCH_LOGIN_INFO");
const LOGOUT_REQUEST = createFetchActionTypes("CREATE_LOGOUT");

export default {
    SUCCESSFUL_LOGIN,
    FETCH_LOGIN_INFO,
    LOGOUT_REQUEST
}