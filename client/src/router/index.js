import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/views/Dashboard'
import Subjects from '@/views/Subjects'
import Calendar from '@/views/Calendar'
import Exams from '@/views/Exams'
import Offers from '@/views/Offers'
import Schedule from '@/views/Schedule'
import Todo from '@/views/Todo'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/subjects',
    name: 'Subjects',
    component: Subjects
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: Calendar
  },
  {
    path: '/exams',
    name: 'Exams',
    component: Exams
  },
  {
    path: '/offers',
    name: 'Offers',
    component: Offers
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: Schedule
  },
  {
    path: '/todo',
    name: 'Todo',
    component: Todo
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
