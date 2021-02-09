import { route } from 'quasar/wrappers'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router'
import { StateInterface } from '../store'
import routes from './routes'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

import { ref } from 'vue'

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable  @typescript-eslint/no-explicit-any */

const historyState = ref(history.state || {})
declare global {
  interface Window { historyState: any }
}
window.historyState = historyState

/* const historyState = ref(history.state || {});
(window as unknown).historyState = historyState */

export default route<StateInterface>(function (/* { store, ssrContext } */) {
  const createHistory =
    process.env.MODE === 'ssr'
      ? createMemoryHistory
      : process.env.VUE_ROUTER_MODE === 'history'
        ? createWebHistory
        : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE
    )
  })

  Router.afterEach(() => {
    window.historyState.value = history.state
  })

  Router.beforeEach((to, from, next) => {
    console.log('---')
    console.log('going from', from.fullPath, 'to', to.fullPath)
    console.log('state:', window.history.state)
    console.log('---')
    next()
  })

  return Router
})
