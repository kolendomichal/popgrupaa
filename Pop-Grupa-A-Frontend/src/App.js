import React from 'react';
import ComputationCockpit from './components/computationCockpit/ComputationCockpit.jsx';
import './App.css';
import {Provider} from 'react-redux';
import store from './app/store';
import LoginContainer from "./app/login/conteiner/LoginContainer";
import NavBar from "./app/common/navbar/NavBar";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import RegistrationContainer from "./app/registration/container/RegistrationContainer";

function App() {
    return (
        <Provider store={store}>
            <div>
                <Router>
                    <NavBar/>
                    <Switch>
                        <Route path="/login" exact component={LoginContainer}/>
                        <Route path="/sign-up" component={RegistrationContainer}/>
                        <Route path="/computation-cockpit" component={ComputationCockpit}/>
                    </Switch>
                </Router>
            </div>
        </Provider>
    );
}

export default App;
