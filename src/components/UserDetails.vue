<template>
  <div>
    <h1>User #{{ id }}</h1>
    <p>
      Name: {{ users[id].name }}
    </p>
    <router-link to="/">Back home</router-link>
  </div>
</template>

<script>
import { defineComponent, readonly } from 'vue'

const users = readonly([
  { name: 'John' },
  { name: 'Jessica' },
  { name: 'James' }
])

export default defineComponent({
  name: 'UserDetails',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data: () => ({ users })
})
</script>
