import React from 'react';
import {Route} from "react-router-dom";
import {Redirect} from 'react-router-dom';
import {UserIdPath} from "../../constants";
import * as Cookies from 'js-cookie';

export const ProtectedRoute = ({component: Component, ...other}) => {
    const userId = Cookies.get(UserIdPath);
    return (
        <Route {...other} render={(props) => (
            userId ? <Component {...props}/> : <Redirect to="/login"/>
        )}/>
    );
};

export default ProtectedRoute
