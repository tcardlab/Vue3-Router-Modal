import { RouteRecordRaw } from 'vue-router'
import Index from 'pages/Index.vue'
import UserDetails from 'components/UserDetails.vue'
import Child from 'components/Child.vue'

// cannot use lazy loading with routs involving modal (breaks on refresh).
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Index,
    children: [
      { path: '', component: Child }
    ]
  },
  { path: '/users/:id', props: true, name: 'user', component: UserDetails },
  // About has no madal view, so it can be lazy loaded
  { path: '/about', component: () => import('components/About.vue') }
]

export default routes
