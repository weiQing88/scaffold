import React, { useEffect, useMemo, useState, useContext,useCallback } from 'react';
import { ThemeContext } from '../../theme-context';
import  { Button } from 'antd';

import imgSrc1 from '@assets/images/101.jpg';
import imgSrc12 from '@assets/images/102.jpg';
import imgSrc13 from '@assets/images/103.jpg';
import imgSrc14 from '@assets/images/104.jpg';
import imgSrc15 from '@assets/images/105.jpg';



// ******  React.memo 为高阶组件。它与 React.PureComponent 非常相似，但它适用于函数组件，但不适用于 class 组件。 ***** 
function areEqual(prevProps, nextProps) {
  /*
  如果把 nextProps 传入 render 方法的返回结果与
  将 prevProps 传入 render 方法的返回结果一致则返回 true，
  否则返回 false
  */
};

// 使用 ‘areEqual’ 自定义判断函数
// const Unchanged = React.memo(function( props ){}, areEqual) 
const Unchanged = React.memo(function( props ){
      console.log('Unchanged 渲染 ---- 不会受到父组件的影响');
    return (<div> . </div>)
})




const data = [
  {
    id : 1,
    src : imgSrc1, // '/assets/images/101.jpg',
    title : 'xxxxx 101'
  },
  {
    id : 2,
    src : imgSrc12, //'/assets/images/102.jpg',
    title : 'xxxxx 101'
  },
  {
    id : 3,
    src : imgSrc13, //'/assets/images/103.jpg',
    title : 'xxxxx 101'
  },
  {
    id : 4,
    src : imgSrc14, // '/assets/images/104.jpg',
    title : 'xxxxx 101'
  },
  {
    id : 5,
    src : imgSrc15, //'/assets/images/105.jpg',
    title : 'xxxxx 101'
  },
];



const List = props => {
  // *** 获取全局主题 ***
  var themeJson = useContext( ThemeContext ),
      theme = JSON.stringify( themeJson ),
      xtem = t => { 
        console.log('初始化执行函数')
        return 'test ' + t 
      };

        // 使用 *** useMemo *** 优化，只有在初始化或根据指定值的变化后执行函数；
        let test_useMemo = useMemo(() => xtem( 'useMemo' ), []);  // [] => 初始化执行函数, [ xxx ] => 指定值的变化后执行函数
    
       let { data = [] } = props;

       console.log('List 渲染');

   return (<ul className="list-elem">
              {
                data.map(( item,index ) => ( <li key={ item.id } className="list-item-elem"> 
                     <img src={ item.src } alt="image"/>
                     <p> { item.title }  </p>
                </li> ))
              }
             
          </ul>)
}



export default function(props){
     let [ value, setValue ] =  useState( 0 );

     // *** useCallback ***  当组件重新渲染的时候不会重新创建函数
    let handleClickOnList = useCallback(( e ) => {
              console.log( 'e', e )
       }, []);

    let handleButton = e => {
          setValue( ++value )
    };

    return (<div className="list-page-layout">  
                <div className="tool-bar">
                  <Button onClick={ handleButton }> 触发父组件更新 : { value } </Button>
                </div>
             
               <Unchanged value={ 0 }   />
              <List data={ data } onClick={  handleClickOnList  }  />
            </div>)
}