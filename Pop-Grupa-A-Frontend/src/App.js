import React from 'react';
import CreateNewClusterNodeForm from './components/clusterNode/CreateNewClusterNodeForm';
import ComputationCockpit from './components/computationCockpit/ComputationCockpit';
import './App.css';
import {Provider} from 'react-redux';
import store from './app/store';
import LoginContainer from "./app/login/conteiner/LoginContainer";
import {Route, BrowserRouter as Router, Switch, Redirect} from "react-router-dom";
import RegistrationContainer from "./app/registration/container/RegistrationContainer";
import ProtectedRoute from "./app/common/router/ProtectedRoute";
import ComputationResourceManagment from './components/clusterNode/ComputationResourceManagement';
import MachineList from './components/clusterNode/MachineList';


function App() {
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path="/" render={() => <Redirect from="/" to="/login" />} />
                    <Route path="/login" exact component={LoginContainer}/>
                    <Route path="/sign-up" component={RegistrationContainer}/>
                    <ProtectedRoute path="/computation-cockpit" component={ComputationCockpit}/>
                    <ProtectedRoute exact path="/computation-resource-management/create-new-cluster-node" component={CreateNewClusterNodeForm}/>
                    <ProtectedRoute exact path="/computation-resource-management" component={ComputationResourceManagment}/>
                    <ProtectedRoute exact path="/computation-resource-management/:chosenClusterNodeId/machine-list" component={MachineList}/>
                </Switch>
            </Router>
        </Provider>
    );
}

export default App;
