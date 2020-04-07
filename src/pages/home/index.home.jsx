import React from 'react';
import { connect } from 'react-redux'
import imgSrc from '@assets/images/nicolas-zhaosi.jpg';



const Home =  props => {
      return (<div className="home-page-layout"> 
                 
                    <h1> Nicolas·ZhaoSi —— <i>你甚至不愿叫我一声教父。</i>  </h1>
                    <h4> </h4>
                    <img id='zhaosi-post' src={ imgSrc } alt=""/>
               </div>)
}

export default connect()(Home)