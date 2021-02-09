<template>
  <div>
    <h1>About</h1>
    <button @click="back">Back</button>
    <span> | </span>
    <router-link to="/">Back home</router-link>
  </div>
</template>

<script>
export default {
  methods: {
    back: () => history.back()
  }
}
</script>
