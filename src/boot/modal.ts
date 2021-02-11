import {
  ref,
  computed,
  watchEffect
} from 'vue'

import {
  useRoute,
  useRouter,
  RouteLocationNormalizedLoaded
} from 'vue-router'

import { boot } from 'quasar/wrappers'

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

export default boot(({ router }) => {
  router.afterEach(() => {
    updateHistory()
  })

  router.beforeEach((to, from, next) => {
    showHistory(to, from)
    next()
  })
})

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

/***  Modal Handlers  ***/
const showModal = (router = useRouter()) => async (routeToObj: any) => {
  // add backgroundView state to the location so we can render a different view from the one
  const backgroundView = router.currentRoute.value.fullPath

  await router.push(routeToObj)

  history.replaceState({ ...history.state, backgroundView }, '')
  historyState.value = history.state
}

const closeModal = () => {
  history.back()
}

const watchModal = (modalRef:any) => watchEffect(
  () => {
    const el = modalRef.value
    if (!el) return

    const show = historyState.value.backgroundView
    console.log('show modal?', show)
    if (show) {
      if ('show' in el) el.show()
      else el.setAttribute('open', '')
    } else {
      if ('close' in el) el.close()
      else el.removeAttribute('open')
    }
  },
  { flush: 'post' }
)

/***  Composition  ***/
const modalComposition = (modalRef:any) => {
  watchModal(modalRef)
  return { showModal: showModal(), closeModal }
}

export { routeWithModal, showModal, closeModal, watchModal, modalComposition }
