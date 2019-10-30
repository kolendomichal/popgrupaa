import types from './loginTypes';

const successfulLogin = (loginData) => ({
  type: types.SUCCESSFUL_LOGIN,
  payload: loginData
});

export default {
  successfulLogin
}