import React from 'react';
import CreateNewClusterNodeForm from './components/clusterNode/CreateNewClusterNodeForm';
import ComputationCockpit from './components/computationCockpit/ComputationCockpit';
import './App.css';
import {Provider} from 'react-redux';
import store from './app/store';
import LoginContainer from "./app/login/conteiner/LoginContainer";
import NavBar from "./app/common/navbar/NavBar";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import RegistrationContainer from "./app/registration/container/RegistrationContainer";
import ComputationResourceManagment from './components/clusterNode/ComputationResourceManagement';
import MachineList from './components/clusterNode/MachineList';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route path="/login" exact component={LoginContainer}/>
                    <Route path="/sign-up" component={RegistrationContainer}/>
                    <Route path="/computation-cockpit" component={ComputationCockpit}/>
                    <Route exact path="/computation-resource-management/create-new-cluster-node" component={CreateNewClusterNodeForm}/>
                    <Route exact path="/computation-resource-management" component={ComputationResourceManagment}/>
                    <Route exact path="/computation-resource-management/:chosenClusterNodeId/machine-list" component={MachineList}/>
                </Switch>
            </Router>
        </Provider>
    );
}

export default App;
