## 基于webpack 4.0 搭建的前端工作流

#### 运行环境
- node 6.x 以上版本
- Mac OSX & Windows

#### 目录结构如下

```
.
├── README.md
├── build
│   ├── .env
│   ├── config.js
│   └── ......
├── assets
│   ├── images
│   └── ...... 
├── dist   
│   
├── mock 
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── test
│
└── src
    ├── api
    ├── components  
    ├── pages
    │   └── index
    │       ├── actions
    │       ├── components
    │       ├── index.js
    │       ├── reducers
    │       └── store
    ├──  axios.config.js
    ├── main.js
    ├── index.less
    └── utils
      
       
```


#### 结构释意
- build webpack 配置
- src 业务代码
    - api 请求
    - components 业务公用代码片段
    - pages/* 页面
    - utils 工具
- assets/静态资源
- public/*.html 项目html页 （默认单页应用为index.html ）
- mock/ mock数据

#### 安装依赖
- ```npm install```

#### 项目运行
- ```npm run dev```
- ```npm run build```
- ```npm run test```

#### 支持创建工程
- PC端 react + react-router + typescript + redux + antd
- 移动端 react + react-router + redux
- ~~react + react-router + redux + 服务端渲染~~

#### 辅助功能
- mock数据
- test 单元测试
- ~~动态生成路由~~

####  说明
>  持续完善。


