import React, { useEffect, useMemo,useState,useContext,useCallback } from 'react';
import { ThemeContext } from './theme-context';
import  { Button } from 'antd';


function Child(  { value, callback }  ){

   const theme1 = useContext( ThemeContext );
   const theme = JSON.stringify( theme1 );

   let changeName = function( value ){
          console.log('被调用')
         return value + '改变name的方法'
   }

   /** useMemo返回缓存的变量，useCallback返回缓存的函数  */

    // 每次重新渲染的时候都会更新
    // let name = changeName();

   // 初始化时被调用
  // let name = useMemo(() => changeName( value ), []);
  
    //  初始化和 value改变的时被调用
  //  let name = useMemo(() => changeName( value ), [value]);


  console.log('子组件更新')

   useEffect(() =>{
        callback();
        console.log('子组件useEffect执行')
   }, [ callback ])
   

    
      return (
      <div>{  theme }{ value }  span</div>
      )
}


// React.memo 为高阶组件。它与 React.PureComponent 非常相似，但它适用于函数组件，但不适用于 class 组件。
function areEqual(prevProps, nextProps) {
    /*
    如果把 nextProps 传入 render 方法的返回结果与
    将 prevProps 传入 render 方法的返回结果一致则返回 true，
    否则返回 false
    */
  };
  const Unchanged = React.memo(function( props ){
        console.log('不会受到父组件的影响')
      return (<div>
          *****Unchanged组件******
      </div>)
  })



export default function(props){
    const [ value, setValue ] = useState(0); 
     // 当组件重新渲染的时候不会重新创建函数
     let handler = useCallback(() => {
        console.log('handler初始化被创建一次')
    }, []);


    const add = () => {
        setValue( value + 1 )
    }

    return (<div>  
             parent
             <Unchanged value={ 0 }   />
             <Button onClick={ add }> add </Button>
              <span> {  value  } </span>
             <Child callback={ handler } value={ 0 } />

            </div>)
}