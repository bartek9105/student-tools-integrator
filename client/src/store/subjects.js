import axios from 'axios'

export default ({
  state: {
    subjects: []
  },
  getters: {
    getSubjects (state) {
      return state.subjects
    }
  },
  mutations: {
    SET_SUBJECTS (state, subjects) {
      state.subjects = subjects
    }
  },
  actions: {
    fetchSubjects ({ commit }) {
      return axios.get('http://localhost:3000/subjects').then(res => {
        commit('SET_SUBJECTS', res.data)
      }).catch(err => console.log(err))
    }
  }
})
