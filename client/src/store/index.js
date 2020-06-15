import Vue from 'vue'
import Vuex from 'vuex'
import AuthenticationService from '../services/AuthenticationService'
import notifications from './notifications'
import calendar from './calendar'
import tasks from './tasks'
import projects from './projects'
import subjects from './subjects'
import exams from './exams'
import offers from './offers'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    drawer: null
  },
  getters: {
    getUser (state) {
      return state.user
    }
  },
  mutations: {
    SET_USER_DATA (state, userData) {
      state.user = userData
      localStorage.setItem('user', JSON.stringify(userData))
    },
    DELETE_USER_DATA () {
      localStorage.removeItem('user')
      location.reload()
    },
    SHOW_SIDEBAR (state) {
      state.drawer = !state.drawer
    }
  },
  actions: {
    signIn ({ commit }, credentials) {
      return AuthenticationService().post('user/login', {
        email: credentials.email,
        password: credentials.password
      }).then(res => {
        commit('SET_USER_DATA', res.data)
      })
    },
    signUp ({ commit }, credentials) {
      return AuthenticationService().post('user/register', {
        email: credentials.email,
        password: credentials.password
      }).then(res => {
        commit('SET_USER_DATA', res.data)
      })
    },
    logout ({ commit }) {
      commit('DELETE_USER_DATA')
    }
  },
  modules: {
    notifications,
    calendar,
    tasks,
    projects,
    subjects,
    exams,
    offers
  }
})
