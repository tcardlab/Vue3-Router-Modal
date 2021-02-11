import {
  computed,
  ref
} from 'vue'

import {
  useRoute,
  useRouter,
  RouteLocationNormalizedLoaded
} from 'vue-router'

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable spaced-comment */

/***  Global  ***/
const route = useRoute
const router = useRouter

const historyState = ref(history.state || {})
declare global {
  interface Window { historyState: any }
}
window.historyState = historyState

/***  Setup Router  ***/
const updateHistory = () => {
  historyState.value = history.state
}

const showHistory = (to:any, from:any) => {
  console.log('---')
  console.log('going from', from.fullPath, 'to', to.fullPath)
  console.log('state:', historyState.value) // window.history.state
  console.log('---')
}

const modalRouting = (Router:any) => {
  Router.afterEach(() => {
    updateHistory()
  })

  Router.beforeEach((to:any, from:any, next:any) => {
    showHistory(to, from)
    next()
  })
}

/***  Route-View Prop Handler  ***/
const routeWithModal = computed(() => {
  if (historyState.value.backgroundView) {
    return router().resolve(
      historyState.value.backgroundView
    ) as RouteLocationNormalizedLoaded
  } else {
    return route()
  }
})

export { modalRouting, routeWithModal }
