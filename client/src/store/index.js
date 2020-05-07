import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import notifications from './notifications'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
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
    logout ({ commmit }) {
      this.commit('DELETE_USER_DATA')
    }
  },
  modules: {
    notifications
  }
})
