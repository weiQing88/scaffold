import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import routerConfig from '../router/index';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../reducers';
import { securityRenderRoutesMap } from '../router/renderRouter';
import ErrorBoundary from './errorBoundary';

const store = createStore( rootReducer );

export default props => {
    return (<ErrorBoundary>
               <Provider store={ store } >
                    <Router>
                    <Switch>
                    { securityRenderRoutesMap( routerConfig ) }
                    </Switch>
                </Router>
            </Provider>
    </ErrorBoundary>)
}