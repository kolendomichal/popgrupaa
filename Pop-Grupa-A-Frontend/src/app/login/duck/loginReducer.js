import types from './loginTypes';

const INITIAL_STATE = {
  loginInfo: undefined
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case types.FETCH_LOGIN_INFO.FULFILLED:
      return {...state, loginInfo: action.payload}; //fixme
    default : return state;
  }
};

export default loginReducer;