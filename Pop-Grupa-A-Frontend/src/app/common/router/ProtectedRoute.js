import React from 'react';
import {connect} from 'react-redux';
import {Route} from "react-router-dom";
import {Redirect} from 'react-router-dom';
import {UserIdPath} from "../../constants";

export const ProtectedRoute = ({component: Component, ...other}) => {
    const userId = localStorage.getItem(UserIdPath);
    return (
        <Route {...other} render={(props) => (
            userId ? <Component {...props}/> : <Redirect to="/login"/>
        )}/>
    );
};

export default ProtectedRoute
