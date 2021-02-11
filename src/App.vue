<template>
  <router-view :route="routeWithModal"></router-view>
</template>
<script lang="ts">
import { useRoute, useRouter, RouteLocationNormalizedLoaded } from 'vue-router'
import {
  computed,
  toRefs,
  defineComponent
} from 'vue'

export default defineComponent({
  name: 'App',
  setup() {
    const route = useRoute()
    const router = useRouter()

    const historyState:any = window.historyState
    const routeWithModal = computed(() => {
      if (historyState.value.backgroundView) {
        return router.resolve(
          historyState.value.backgroundView
        ) as RouteLocationNormalizedLoaded
      } else {
        return route
      }
    })

    return { route, routeWithModal, historyState, ...toRefs(route) }
  }
})
</script>
