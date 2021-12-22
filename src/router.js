import Vue from 'vue'
import VueRouter from 'vue-router'
import ToDoList from './components/ToDoList'
import ToDoDetail from './components/ToDoDetail'

const routes = [
  { path: '/', component: ToDoList },
  { path: '/detail', component: ToDoDetail },
]

Vue.use(VueRouter)

export default new VueRouter({
  routes
})