import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";
import Loadable from 'react-loadable';


// 避免Loading组件闪屏
// loader加载超时
// 服务器端渲染指南  https://react-router.docschina.org/web/guides/code-splitting
const LoadingComponent = props => {
    if (props.error) {
      //  return <div>Error! <button onClick={ props.retry }>点击重试</button></div>;
        return <div>Error! <button >点击重试</button></div>;
      } else if (props.timedOut) {
        return <div>Taking a long time... <button >点击重试</button></div>;
      } else if (props.pastDelay) {
        return (<span className="loadable-loading">  loadable-loading </span>)
      } else {
        return null;
      } 
}


// 验证是否已登录
const LogonStatus = props => {
      let token = 'sdfsd'; // 
      let LoadableComponent = Loadable({
          loader : () => import(`../${ props.component }`),  // 【 必须在${ props.component }前加上 ‘/’，才能正确编译 】
          loading : LoadingComponent,
          delay: 300
      });
       if( props.accessible ){
           if( props.redirect ) return (<Redirect from='/' to={ props.redirect  } />);
           return (<LoadableComponent {...props} />);
       }
       if( token ){
           return (<LoadableComponent {...props} />);
        }else{
             return (<Redirect from={ props.path } to={'/login'} />)
        }
}



// 权限验证
const RouterGuard = props => {
      let { component, routes, auth } = props;
       if( auth ){
            let LoadableComponent = Loadable({
                loader : () => import(`../${ component }`),  // 【 必须在${ props.component }前加上 ‘/’，才能正确编译 】
                loading : LoadingComponent,
                delay: 300
            });
        if( routes && routes.length ){
            return (<LoadableComponent {...props} >{ renderRoutesMap( routes ) }</LoadableComponent>)
        }else{
            return (<LoadableComponent {...props} />)
        }
        
       }else{ // 跳转到无权限页面
           return <Redirect from={ props.path } to={'/unauthorized'} />
       }
}


// 遍历路由函数
export const renderRoutesMap = ( routes, url ) => routes.map(( route, index ) => ( <Route exact key={index} path={ url + route.path } 
 render={ props => <RouterGuard {...props} { ...route } /> } />));  

export const securityRenderRoutesMap = routes => routes.map(( route, index ) => ( <Route exact={ route.exact } key={index} path={ route.path } 
    render={ props => <LogonStatus {...props} { ...route } /> } />));  

