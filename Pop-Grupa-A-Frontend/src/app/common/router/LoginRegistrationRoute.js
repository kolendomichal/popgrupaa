import React from 'react';
import {Route} from "react-router-dom";
import {Redirect} from 'react-router-dom';
import {UserIdPath, RolePath, Role} from "../../constants";
import * as Cookies from 'js-cookie';

const LoginRegistrationRoute = ({component: Component, ...other}) => {
    const userId = Cookies.get(UserIdPath);
    const userRole = Cookies.get(RolePath);

    const getNextRoute = (props) => {
        if(!userId || !userRole) {
            return (<Component {...props}/>);
        } else if(userId && (userRole === Role.Admin.code || userRole === Role.AppUser.code)) {
            return (<Redirect to="/computation-cockpit"/>);
        } else if(userId && userRole === Role.Supplier.code) {
            return (<Redirect to="/computation-resource-management"/>)
        }
    }
    return (
        <Route {...other} render={(props) => getNextRoute(props)}/>
    );
};

export default LoginRegistrationRoute;