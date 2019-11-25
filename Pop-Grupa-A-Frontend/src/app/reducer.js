import {combineReducers} from 'redux';
import login from './login/duck/loginReducer';
import {reducer as form} from 'redux-form';
import clusterMachineList from '../app/cluster-machine-list/duck/clusterMachineListReducer';
import machineList from '../app/machine-list/duck/machineListReducer';

const rootReducer = combineReducers({
    login,
    form,
    clusterMachineList,
    machineList
});

export default rootReducer;