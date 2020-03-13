import React , { useEffect, useState, Component } from 'react';
import ReactDom from 'react-dom';
 class App extends Component<any, any>{
       render(){
             return (<div>
                 这里是Tsx 
             </div>)
       }
}

ReactDom.render(<App />, document.getElementById('root'));
