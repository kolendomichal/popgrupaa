import React from 'react';
import {Route} from "react-router-dom";
import {Redirect} from 'react-router-dom';
import {UserIdPath, RolePath } from "../../constants";
import * as Cookies from 'js-cookie';

const ProtectedRoute = ({component: Component, roles, ...other}) => {
    const userId = Cookies.get(UserIdPath);
    const userRole = Cookies.get(RolePath);
    return (
        <Route {...other} render={(props) => (
            userId && roles.find(r => r === userRole) ? <Component {...props}/> : userId && !roles.find(r => r === userRole) ?
                    <Redirect to="/not-found"/> : <Redirect to="/login"/>
        )}/>
    );
};

export default ProtectedRoute;

