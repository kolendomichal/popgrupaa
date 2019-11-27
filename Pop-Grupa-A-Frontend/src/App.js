import React from 'react';
import ComputationCockpit from './components/computationCockpit/ComputationCockpit.jsx';
import './App.css';
import {Provider} from 'react-redux';
import store from './app/store';
import LoginContainer from "./app/login/conteiner/LoginContainer";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import RegistrationContainer from "./app/registration/container/RegistrationContainer";
import ComputationResourceManagment from './components/clusterNode/ComputationResourceManagement.jsx';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route path="/login" exact component={LoginContainer}/>
                    <Route path="/sign-up" component={RegistrationContainer}/>
                    <Route path="/computation-cockpit" component={ComputationCockpit}/>
                    <Route path="/computation-resource-managment" component={ComputationResourceManagment}/>
                </Switch>
            </Router>
        </Provider>
    );
}

export default App;
