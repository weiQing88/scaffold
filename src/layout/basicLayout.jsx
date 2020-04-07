import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import {ThemeContext, themes} from '../theme-context';  // ***  全局主题色  ***
import { connect } from 'react-redux'
import { renderRoutesMap } from '../router/renderRouter';

import NavBar from '@/components/navbar';

const Base =  props => {
          var { routes = [], match } = props;
          // console.log( 'routes', routes )
           // console.log( 'match', match )
          //  console.log( 'props', props )
          useEffect(() => {
               /**
                *  设置‘项目布局路由’下的默认子路由； 【待优化】    <NavBar />
                */
               if( props.location.pathname === process.env.PROJECT_ROUTE ) 
                   window.location.href = window.location.origin + process.env.INDEX_ROUTE;
          },[ props.location.pathname ])
          return ( <ThemeContext.Provider value={ themes.dark } > 
                    <div  id="baseLayout" className="layout">
                  
                     { renderRoutesMap( routes, match.path ) }
                     </div> 
                  </ThemeContext.Provider>)
}





export default connect(( state, ownProps ) => {  return { ...state  } } )(Base)