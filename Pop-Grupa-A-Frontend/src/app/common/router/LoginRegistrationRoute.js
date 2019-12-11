import React from 'react';
import {Route} from "react-router-dom";
import {Redirect} from 'react-router-dom';
import {UserIdPath, RolePath, Role} from "../../constants";
import * as Cookies from 'js-cookie';

const LoginRegistrationRoute = ({component: Component, ...other}) => {
    const userId = Cookies.get(UserIdPath);
    const userRole = Cookies.get(RolePath);
    return (
        <Route {...other} render={(props) => (
            !userId ? <Component {...props}/> : userId && (userRole === Role.Admin || userRole === Role.AppUser) ?
                    <Redirect to="/computation-cockpit"/> : <Redirect to="/computation-resource-management"/>
        )}/>
    );
};

export default LoginRegistrationRoute;