import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/views/Dashboard'
import Subjects from '@/views/Subjects'
import Calendar from '@/views/Calendar'
import Exams from '@/views/Exams'
import Offers from '@/views/Offers'
import Schedule from '@/views/Schedule'
import Todo from '@/views/Todo'
import Login from '@/views/Login'
import Register from '@/views/Register'

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
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      hideNav: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      hideNav: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
