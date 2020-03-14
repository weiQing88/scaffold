import NotFound from '../layout/notFound'
import LoginCompt from '../login/login';
import RegisterCompt from '../login/register';
import BaseCompt from '../layout/baseLevelLayout';

export default  [  
    {
        path: "/login",
        name : 'login',
        icon : '',
        component: LoginCompt
      },
      {
        path: "/register",
        name : 'register',
        icon : '',
        component: RegisterCompt
      },
      {
        path: "/index",
        name : 'index',
        icon : '',
        component: BaseCompt,
        routes : []
      },
       {
        path : '*',
        name : 'notfound',
        icon : '',
        component: NotFound
       },
];