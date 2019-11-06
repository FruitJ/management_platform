// application's routes
export const routes = [
  {
    // 欢迎页
    path: '/welcome',
    component: '../pages/welcome/NewWelcome',
  },
  {
    path: '/user',
    routes: [
      {
        path: '/user/login',
        component: '../pages/consumer/LoginRouter',
      },
      {
        path: '/user/register',
        component: '../pages/consumer/RegisterRouter',
      },
      {
        path: '/user/forgetPassword',
        component: '../pages/consumer/ForgetPasswordRouter',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        // authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/home',
          },
          {
            path: '/home',
            name: 'welcome',
            icon: 'smile',
            component: './Welcome',
          },
          {
            path: '/goods-manage',
            name: 'goods-manage',
            icon: 'shopping',
            routes: [
              {
                path: '/goods-manage/action/query',
                name: 'query',
                component: '../pages/goods-manage/GoodsListRouter',
              },
              {
                path: '/goods-manage/action/add',
                name: 'add',
                component: './goods-manage/GoodsAddRouter',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
