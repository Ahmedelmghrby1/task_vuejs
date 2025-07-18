// import { defineRouter } from '#q-app/wrappers'
// import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
// import routes from './routes'

// /*
//  * If not building with SSR mode, you can
//  * directly export the Router instantiation;
//  *
//  * The function below can be async too; either use
//  * async/await or return a Promise which resolves
//  * with the Router instance.
//  */

// export default defineRouter(function (/* { store, ssrContext } */) {
//   const createHistory = process.env.SERVER
//     ? createMemoryHistory
//     : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

//   const Router = createRouter({
//     scrollBehavior: () => ({ left: 0, top: 0 }),
//     routes,

//     // Leave this as is and make changes in quasar.conf.js instead!
//     // quasar.conf.js -> build -> vueRouterMode
//     // quasar.conf.js -> build -> publicPath
//     history: createHistory(process.env.VUE_ROUTER_BASE)
//   })

//   return Router
// })


import routes from './routes'
import { route } from 'quasar/wrappers'
import { createRouter, createWebHistory } from 'vue-router'

const Router = route(() => {
  const router = createRouter({
    history: createWebHistory(),
    routes
  })

  router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !localStorage.getItem('token')) {
      next('/login')
    } else {
      next()
    }
  })

  return router
})

export default Router
