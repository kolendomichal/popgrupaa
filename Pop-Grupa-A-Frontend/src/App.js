import React from 'react';
import createNewClusterNodeForm from './components/clusterNode/createNewClusterNodeForm.jsx';
import ComputationCockpit from './components/computationCockpit/ComputationCockpit.jsx';
import './App.css';
import {Provider} from 'react-redux';
import store from './app/store';
import LoginContainer from "./app/login/conteiner/LoginContainer";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import RegistrationContainer from "./app/registration/container/RegistrationContainer";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route path="/login" exact component={LoginContainer}/>
                    <Route path="/sign-up" component={RegistrationContainer}/>
                    <Route path="/computation-cockpit" component={ComputationCockpit}/>
                    <Route path="/create-new-cluster-node" component={createNewClusterNodeForm}/>
                </Switch>
            </Router>
        </Provider>
    );
}

export default App;
