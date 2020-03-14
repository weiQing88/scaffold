import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import routerConfig from '../router/index';



export default function( props ){
    return (<Router>
              <Switch>
                <Route exact path='/' render={ props => ( <Redirect to={{ pathname: '/index', state: { from: props.location }}} /> )} ></Route>
                {
                  routerConfig.map(( route, index ) => (<Route 
                                              exact 
                                              path={ route.path } 
                                              key={ index } 
                                              render={ props => (<route.component {...props} routes={ route.routes || [] } />)}
                                               /> ))
                }

              </Switch>
    </Router>)
}