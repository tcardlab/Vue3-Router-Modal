<template>
  
    <div>
      <h1>Home</h1>
      <p>Select a user</p>
      <ul>
        <li v-for="(user, id) in users">
          <router-link :to="{ name: 'user', params: { id }}">{{ user.name }}</router-link>
          - <button @click="showModal({ name: 'user', params: { id }})">Details</button>
        </li>
      </ul>

      <router-view />

      <dialog ref="modal" id="dialog">
        <div>
          <div v-if="userId">
            <p>
            User #{{ userId }}
            <br>
            Name: {{ users[userId].name }}
            </p>
            <router-link to="/about">Go somewhere else</router-link>
            <br>
            <button @click="closeModal">Close</button>
          </div>
        </div>
      </dialog>
    </div>
  
</template>

<script lang="ts">
import { useRoute, useRouter } from 'vue-router'
import {
  readonly,
  ref,
  computed,
  defineComponent
} from 'vue'

import { showModal, closeModal, watchModal } from 'boot/modal'

const users = readonly([
  { name: 'John' },
  { name: 'Jessica' },
  { name: 'James' }
])

export default defineComponent({
  name: 'PageIndex',
  setup() {
    const route = useRoute()
    const userId = computed(() => route.params.id)

    const modal = ref<HTMLDialogElement | HTMLElement>()
    watchModal(modal)

    const router = useRouter()
    return {
      modal,
      showModal: showModal(router),
      closeModal,
      userId,
      users,
    }
  }
})
</script>
