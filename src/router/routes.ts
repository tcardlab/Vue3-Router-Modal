import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('pages/Index.vue'),
    children: [
      // to check that displaying the modal doesn't change this
      { path: '', component: () => import('components/Child.vue') }
    ]
  },
  { path: '/about', component: () => import('components/About.vue') },
  { path: '/users/:id', props: true, name: 'user', component: () => import('components/UserDetails.vue') }
]

export default routes
