import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';
import alert from './alert/alertReducer';

const rootReducer = combineReducers({
    form,
    alert
});

export default rootReducer;