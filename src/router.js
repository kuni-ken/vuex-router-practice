import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './pages/Login'
import ToDoList from './pages/ToDoList'
import ToDoDetail from './pages/ToDoDetail'

const routes = [
  { path: '/', component: Login },
  { path: '/list', component: ToDoList },
  { path: '/detail/create', component: ToDoDetail },
  { path: '/detail/:id', component: ToDoDetail },
]

Vue.use(VueRouter)

export default new VueRouter({
  routes
})
