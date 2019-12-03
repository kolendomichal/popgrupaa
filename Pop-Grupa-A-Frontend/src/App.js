import React from 'react';
<<<<<<< HEAD
import createNewClusterNodeForm from './components/clusterNode/createNewClusterNodeForm.jsx';
import ComputationCockpit from './components/computationCockpit/ComputationCockpit';
=======
import CreateNewClusterNodeForm from './components/clusterNode/createNewClusterNodeForm.jsx';
import ComputationCockpit from './components/computationCockpit/ComputationCockpit.jsx';
>>>>>>> 634426a6c51fa3f97819a7e773bfc3beb39651c8
import './App.css';
import {Provider} from 'react-redux';
import store from './app/store';
import LoginContainer from "./app/login/conteiner/LoginContainer";
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
<<<<<<< HEAD
                    <Route path="/create-new-cluster-node" component={createNewClusterNodeForm}/>
                    <Route exact path="/computation-resource-management" component={ComputationResourceManagment}/>
                    <Route exact path="/computation-resource-management/:chosenClusterNodeId/machine-list" component={MachineList}/>
=======
                    <Route path="/create-new-cluster-node" component={CreateNewClusterNodeForm}/>
>>>>>>> 634426a6c51fa3f97819a7e773bfc3beb39651c8
                </Switch>
            </Router>
        </Provider>
    );
}

export default App;
