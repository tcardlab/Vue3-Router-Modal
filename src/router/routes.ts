import { RouteRecordRaw } from 'vue-router'
import Index from 'pages/Index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/ModalLayout.vue'),
    children: [
      { path: '', component: Index }, // cannot use lazy loading (modal breaks on refresh).
      { path: '/about', component: () => import('pages/About.vue') },
      { path: '/users/:id', props: true, name: 'user', component: () => import('pages/UserDetails.vue') }
    ]
  }
]

export default routes
