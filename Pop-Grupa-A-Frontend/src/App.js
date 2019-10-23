import React from 'react';
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
        <NavBar/>
        <div>
          <Router>
            <Switch>
              <Route path="/" exact component={LoginContainer}/>
              <Route path="/sign-up" component={RegistrationContainer}/>}
              />
            </Switch>
          </Router>
        </div>
      </div>
    </Provider>
  );
}

export default App;
