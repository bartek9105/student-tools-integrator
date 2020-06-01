import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import notifications from './notifications'
import calendar from './calendar'
import tasks from './tasks'
import subjects from './subjects'
import exams from './exams'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: ''
  },
  getters: {
    getUser (state) {
      return state.user
    }
  },
  mutations: {
    SET_USER_DATA (state, userData) {
      state.user = userData
    },
    DELETE_USER_DATA (state) {
      state.user = null
    }
  },
  actions: {
    signIn ({ commit }, credentials) {
      return axios.post('http://localhost:3000/user/login', {
        email: credentials.email,
        password: credentials.password
      }).then(res => {
        commit('SET_USER_DATA', res.data)
      })
    },
    signUp ({ commit }, credentials) {
      return axios.post('http://localhost:3000/user/register', {
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
    subjects,
    exams
  }
})
