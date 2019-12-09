import React from 'react';
import CreateNewClusterNodeForm from './components/clusterNode/CreateNewClusterNodeForm';
import ComputationCockpit from './components/computationCockpit/ComputationCockpit';
import './App.css';
import {Provider} from 'react-redux';
import store from './app/store';
import LoginContainer from "./app/login/conteiner/LoginContainer";
import {Route, BrowserRouter as Router, Switch, Redirect} from "react-router-dom";
import RegistrationContainer from "./app/registration/container/RegistrationContainer";
import ProtectedRoute from "./app/common/router/ProtectedRoutes";
import ComputationResourceManagment from './components/clusterNode/ComputationResourceManagement';
import MachineList from './components/clusterNode/MachineList';
import NotFoundPage from "./app/common/router/NotFoundPage";
import {Role} from "./app/constants";
import AlertComponent from './app/common/alert/AlertComponent';

function App() {
    return (
        <Provider store={store}>
            <AlertComponent/>
            <Router>
                <Switch>
                    <Route exact path="/" render={() => <Redirect from="/" to="/login" />} />
                    <Route path="/login" exact component={LoginContainer}/>
                    <Route path="/sign-up" component={RegistrationContainer}/>
                    <Route path="/not-found" component={NotFoundPage}/>
                    <ProtectedRoute path="/computation-cockpit" component={ComputationCockpit} roles={[Role.AppUser.code, Role.Admin.code]}/>
                    <ProtectedRoute exact path="/computation-resource-management/create-new-cluster-node" component={CreateNewClusterNodeForm} roles={[Role.AppUser.code]}/>
                    <ProtectedRoute exact path="/computation-resource-management" component={ComputationResourceManagment} roles={[Role.Supplier.code]}/>
                    <ProtectedRoute exact path="/computation-resource-management/:chosenClusterNodeId/machine-list" component={MachineList} roles={[Role.Supplier.code]}/>
                </Switch>
            </Router>
        </Provider>
    );
}

export default App;
