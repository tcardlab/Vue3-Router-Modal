<template>
  
    <div>
      <h1>Home</h1>
      <p>Select a user</p>
      <ul>
        <li v-for="(user, id) in users">
          <router-link :to="{ name: 'user', params: { id }}">{{ user.name }}</router-link>
          - <button @click="showUserModal(id)">Details</button>
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
            <button @click="closeUserModal">Close</button>
          </div>
        </div>
      </dialog>
    </div>
  
</template>

<script lang="ts">
import About from 'components/About.vue'
import Child from 'components/Child.vue'
import UserDetails from 'components/UserDetails.vue'

import { useRoute, useRouter } from 'vue-router'
import {
  readonly,
  ref,
  watchEffect,
  computed,
  defineComponent
} from 'vue'

const users = readonly([
  { name: 'John' },
  { name: 'Jessica' },
  { name: 'James' }
])


const showUserModal = (router:any) => async (id: number) => {
  // add backgroundView state to the location so we can render a different view from the one
  console.log(router)
  const backgroundView = router.currentRoute.value.fullPath

  await router.push({
    name: 'user',
    params: { id }
    // state: { backgroundView },
  })

  history.replaceState({ ...history.state, backgroundView }, '')
  window.historyState.value = history.state
}

function closeUserModal() {
  history.back()
}

export default defineComponent({
  name: 'PageIndex',
  components: { About, Child, UserDetails },
  setup() {
    const modal = ref<HTMLDialogElement | HTMLElement>()
    const route = useRoute()
    const router = useRouter()
    // const historyState = computed(() => route.fullPath && window.history.state)

    const userId = computed(() => route.params.id)

    watchEffect(
      () => {
        const el = modal.value
        if (!el) return

        const show = window.historyState.value.backgroundView
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

    return {
      modal,
      'historyState': window.historyState,
      'showUserModal': showUserModal(router),
      closeUserModal,
      userId,
      users,
    }
  }
})
</script>
