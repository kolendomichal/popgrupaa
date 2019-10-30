import types from './loginTypes';

const INITIAL_STATE = {
  loginInfo: undefined
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case types.SUCCESSFUL_LOGIN:
      return {...state, loginInfo: action.payload};
    default : return state;
  }
};

export default loginReducer;