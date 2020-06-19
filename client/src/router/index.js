import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/views/Dashboard'
import Subjects from '@/views/Subjects'
import SubjectDetails from '@/views/SubjectDetails'
import Exams from '@/views/Exams'
import Offers from '@/views/Offers'
import Schedule from '@/views/Schedule'
import Todo from '@/views/Todo'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Calendar from '@/views/Calendar'
import NotFoundPage from '@/views/NotFoundPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/subjects',
    name: 'Subjects',
    component: Subjects,
    meta: { requiresAuth: true }
  },
  {
    path: '/subject/:id',
    name: 'Subject',
    component: SubjectDetails,
    meta: { requiresAuth: true }
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: Calendar,
    meta: { requiresAuth: true }
  },
  {
    path: '/exams',
    name: 'Exams',
    component: Exams,
    meta: { requiresAuth: true }
  },
  {
    path: '/offers',
    name: 'Offers',
    component: Offers,
    meta: { requiresAuth: true }
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: Schedule,
    meta: { requiresAuth: true }
  },
  {
    path: '/todo',
    name: 'Todo',
    component: Todo,
    meta: { requiresAuth: true }
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
  },
  {
    path: '*',
    component: NotFoundPage,
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

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user')
  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/login')
  }
  next()
})

export default router
