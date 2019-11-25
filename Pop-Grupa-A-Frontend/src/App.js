import React from 'react';
import ComputationCockpit from './components/computationCockpit/ComputationCockpit.jsx';
import './App.css';
import {Provider} from 'react-redux';
import store from './app/store';
import LoginContainer from "./app/login/conteiner/LoginContainer";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import RegistrationContainer from "./app/registration/container/RegistrationContainer";
import ClusterMachineListContainer from "./app/cluster-machine-list/container/ClusterMachineListContainer";
import MachineListContainer from "./app/machine-list/container/MachineListContainer";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route path="/login" exact component={LoginContainer}/>
                    <Route path="/sign-up" component={RegistrationContainer}/>
                    <Route path="/computation-cockpit" component={ComputationCockpit}/>
                    <Route path="/cluster-machine-list" component={ClusterMachineListContainer}/>
                    <Route path="/machine-list" component={MachineListContainer}/>
                </Switch>
            </Router>
        </Provider>
    );
}

export default App;
