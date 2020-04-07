import './index.scss';
import 'antd/dist/antd.css'; // 加入 antd ui 样式文件
import React from 'react';
import ReactDom from 'react-dom';
import App from './layout/securityLayout';
import './axios.config';
ReactDom.render(<App />, document.getElementById('root'));


