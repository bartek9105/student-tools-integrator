import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

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
    async signIn ({ commit }, credentials) {
      try {
        const res = await axios.post('http://localhost:3000/user/login', {
          email: credentials.email,
          password: credentials.password
        })
        commit('SET_USER_DATA', res.data)
      } catch (error) {
        console.log(error)
      }
    },
    async signUp ({ commit }, credentials) {
      try {
        await axios.post('http://localhost:3000/user/register', {
          email: credentials.email,
          password: credentials.password
        })
      } catch (error) {
        console.log(error)
      }
    },
    logout ({ commmit }) {
      this.commit('DELETE_USER_DATA')
    }
  },
  modules: {
  }
})
