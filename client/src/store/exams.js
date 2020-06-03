import Api from '../services/Api'

export default ({
  state: {
    exams: []
  },
  getters: {
    getExams (state) {
      return state.exams
    }
  },
  mutations: {
    SET_EXAMS (state, exams) {
      state.exams = exams
    }
  },
  actions: {
    fetchExams ({ commit }) {
      Api().get('exams').then(res => {
        commit('SET_EXAMS', res.data)
      }).catch(err => console.log(err))
    },
    addExam ({ commit, dispatch }, exam) {
      Api().post('exams/add', exam).then(res => {
        dispatch('fetchExams')
      }).catch(err => console.log(err))
    },
    deleteExam ({ commit, dispatch }, examId) {
      Api().delete(`exams/${examId}/delete`).then(() => {
        dispatch('fetchExams')
      }).catch(err => console.log(err))
    }
  }
})
