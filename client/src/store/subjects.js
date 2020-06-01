import Api from '../services/Api'

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
    },
    ADD_SUBJECT (state, subject) {
      state.subjects.push(subject)
    }
  },
  actions: {
    fetchSubjects ({ commit }) {
      return Api().get('subjects').then(res => {
        commit('SET_SUBJECTS', res.data)
      }).catch(err => console.log(err))
    },
    addSubject ({ commit }, payload) {
      Api().post('subjects/add', payload).then(result => {
        commit('ADD_SUBJECT', result.data.subject)
      }).catch(err => console.log(err))
    }
  }
})
