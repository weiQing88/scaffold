// 【!!!  component属性的值 前面不能有 ‘/’; 】
// 【!!!  把 /login 和 /register 这两项路由配置置于最前。 】
// 【!!!  accessible : true  不做登录验证处理 。 】
// 【!!!  auth : <arry[string]> | <boolean> | <string>  项目路由权限 】
export default  [  
  {
    path: "/login",
    name : 'login',
    icon : '',
    component: 'login/login',
    accessible : true,
    exact : false,
  },
  {
    path: "/register",
    name : 'register',
    icon : '',
    component: 'login/register',
    accessible : true,
    exact : false,
  },
   {
    path: "/",   
    name : 'index',
    icon : '',
    redirect: '/app',   // 【!!! 跳转到 ‘项目布局路由’ 】
    accessible : true,
    exact : true,
   },
 {
    path: "/app",   // 【!!! 项目布局路由，需同步修改  需同步修改 build/.env 文件中的 PROJECT_ROUTE 属性值 】
    name : 'app',
    icon : '',
    component: 'layout/basicLayout',
    accessible : false,
    exact : false,
    routes : [   /**   start of layout/basicLayout.routes 【!!!!  该级下的子路由才是真正的项目路由 !!!!】   */
        {
          path: "/home",  // 【!!! 需同步修改 build/.env 文件中的 INDEX_ROUTE 属性值  】
          name : 'home',
          icon : '',
          component: 'pages/home/index.home',
          auth : true
        },
        {
          path: "/list",
          name : 'list',
          icon : '',
          component: 'pages/list/index.list',
          auth : true
        },

    ]  /**  end of layout/basicLayout.routes 【!!!!  该级下的子路由才是真正的项目路由 !!!!】   */
  },

    {
      path : '/unauthorized',
      name : 'unauthorized',
      icon : '',
      component: 'layout/unauthorized',
      accessible : true,
      exact : false,
    },
   {
    path : '*',
    name : 'notfound',
    icon : '',
    component: 'layout/notFound',
    accessible : true,
   },
];