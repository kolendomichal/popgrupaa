import { combineReducers } from 'redux';
import login from './login/duck/loginReducer';
import { reducer as form} from 'redux-form';

const rootReducer = combineReducers({
  login,
  form
});

export default rootReducer;