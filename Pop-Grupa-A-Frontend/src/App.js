import React from 'react';
import ComputationCockpit from './components/computationCockpit/ComputationCockpit';
import './App.css';
import {Provider} from 'react-redux';
import store from './app/store';
import LoginContainer from "./app/login/conteiner/LoginContainer";
import NavBar from "./app/common/navbar/NavBar";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import RegistrationContainer from "./app/registration/container/RegistrationContainer";
import ProtectedRoute from "./app/common/router/ProtectedRoute";
import ComputationResourceManagment from './components/clusterNode/ComputationResourceManagement';


function App() {
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route path="/login" exact component={LoginContainer}/>
                    <Route path="/sign-up" component={RegistrationContainer}/>
                    <ProtectedRoute path="/computation-cockpit" component={ComputationCockpit}/>
                    <ProtectedRoute path="/computation-resource-management" component={ComputationResourceManagment}/>
                </Switch>
            </Router>
        </Provider>
    );
}

export default App;
