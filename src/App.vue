<template>
  <router-view :route="routeWithModal"></router-view>
</template>

<script lang="ts">
import { routeWithModal } from 'boot/modal'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  setup () {
    return { routeWithModal }
  }
})
</script>
