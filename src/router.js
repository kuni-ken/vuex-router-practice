import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './pages/Login'
import ToDoList from './pages/ToDoList'
import ToDoDetail from './pages/ToDoDetail'
import store from './store'
import { getterTypes, modules } from './store/const'

const routes = [
  { path: '/', component: Login },
  { path: '/list', component: ToDoList, meta: { requiresAuth: true } },
  { path: '/detail/create', component: ToDoDetail, meta: { requiresAuth: true } },
  { path: '/detail/:id', component: ToDoDetail, meta: { requiresAuth: true } },
]

Vue.use(VueRouter)

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const isLoggedIn = store.getters[modules.AUTH + '/' + getterTypes.AUTH_ISLOGGEDIN];
    if (!isLoggedIn) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
