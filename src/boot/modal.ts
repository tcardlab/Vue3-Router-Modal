import { ref } from 'vue'

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable spaced-comment */

/***  Global  ***/
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

export { modalRouting }
