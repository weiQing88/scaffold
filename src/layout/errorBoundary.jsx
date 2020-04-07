import React from 'react';

 export default class ErrorBoundary extends React.Component {
      constructor( props ){
            super( props );
            this.state = { hasError : false };
      }

      static getDerivedStateFromError( error ){
            return { hasError : true }
      }


     componentDidCatch( error, errorInfo ){
          // console.log('errorInfo---', errorInfo)
           // to something
     }

     render(){
         if( this.state.hasError ) return (<p> 出现未知错误 </p>);
         return this.props.children;        
     }
}