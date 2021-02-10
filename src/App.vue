<template>
  <router-view :route="routeWithModal"></router-view>
</template>
<script lang="ts">
import { useRoute, useRouter, RouteLocationNormalizedLoaded } from 'vue-router'
import {
  computed,
  toRefs,
  defineComponent,
} from 'vue'

export default defineComponent({
  name: 'App',
  setup() {
    const route = useRoute()
    const router = useRouter()
    // const historyState = computed(() => route.fullPath && window.history.state)
    const routeWithModal = computed(() => {
      if (window.historyState.value.backgroundView) {
        return router.resolve(
          window.historyState.value.backgroundView
        ) as RouteLocationNormalizedLoaded
      } else {
        return route
      }
    })

    return { route, routeWithModal, 'historyState': window.historyState, ...toRefs(route) }
  }
})
</script>
