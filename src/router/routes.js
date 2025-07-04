// src/router/routes.js
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'), // this MUST exist
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue') // your QPage component
      }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/MainLayout.vue'), // still needs layout
    children: [
      {
        path: '',
        component: () => import('pages/LoginPage.vue')
      }
    ]
  },
  {
    path: '/register',
    component: () => import('layouts/MainLayout.vue'), // still needs layout
    children: [
      {
        path: '',
        component: () => import('pages/RegisterPage.vue')
      }
    ]
  }
]

export default routes
// const routes = [
//   {
//     path: '/',
//     component: () => import('layouts/MainLayout.vue'),
//     children: [
//       {
//         path: '',
//         component: () => import('pages/IndexPage.vue'),
//         meta: { requiresAuth: true }
//       }
//     ]
//   },
//   { path: '/login', component: () => import('pages/LoginPage.vue') },
//   { path: '/register', component: () => import('pages/RegisterPage.vue') },
//   { path: '/:catchAll(.*)*', component: () => import('pages/ErrorNotFound.vue') }
// ]

// export default routes
