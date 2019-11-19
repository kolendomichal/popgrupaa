import {combineReducers} from 'redux';
import login from './login/duck/loginReducer';
import {reducer as form} from 'redux-form';
import session from './session/duck/sessionReducer';

const rootReducer = combineReducers({
    login,
    form,
    session
});

export default rootReducer;