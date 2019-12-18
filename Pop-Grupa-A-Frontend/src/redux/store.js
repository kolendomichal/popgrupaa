import {applyMiddleware, createStore} from 'redux';
import rootReducer from './reducer';
import logger from 'redux-logger';
import thunk from "redux-thunk"
import {requestActionMiddleware} from "./middlewares";

const store = createStore(rootReducer, applyMiddleware(logger, thunk, requestActionMiddleware));

export default store;