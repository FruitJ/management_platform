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
                path: '/goods-manage/query/spu-list',
                name: 'query',
                component: '../pages/goods-manage/SpuListRouter',
              },
              {
                path: '/goods-manage/add/sku-item',
                name: 'add',
                component: './goods-manage/SkuAddRouter',
              },
              {
                path: '/goods-manage/query/sku-list',
                component: '../pages/goods-manage/SkuListRouter',
              },
              {
                path: '/goods-manage/update/brand',
                name: 'goodsCategory',
                authority: ['张无忌'],
                component: '../pages/goods-manage/GoodsCategoryRouter',
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
