export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
    ],
  },
  {
    name: 'head',
    icon: 'dashboard',
    path: '/head',
    component: './head',
  },
  {
    name: 'statistics',
    icon: 'cluster',
    path: '/statistics',
    component: './statistics',
  },
  {
    name: 'tasks',
    icon: 'database',
    path: '/tasks',
    component: './tasks',
  },
  {
    name: 'users',
    icon: 'user',
    path: '/users',
    component: './users',
  },
  {
    name: 'setting',
    icon: 'setting',
    path: '/setting',
    component: './setting',
  },
  {
    name: 'about',
    icon: 'infoCircle',
    path: '/about',
    component: './about',
  },
  {
    path: '/',
    redirect: '/head',
  },
  {
    component: './404',
  },
];
