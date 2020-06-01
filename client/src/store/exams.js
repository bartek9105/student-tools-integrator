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
    ADD_EXAM (state, exam) {
      state.exams.push(exam)
    },
    SET_EXAMS (state, exams) {
      state.exams = exams
    }
  },
  actions: {
    addExam ({ commit }, exam) {
      Api().post('exams/add', exam).then(res => {
        commit('ADD_EXAM', res.data)
      }).catch(err => console.log(err))
    },
    fetchExams ({ commit }) {
      Api().get('exams').then(res => {
        commit('SET_EXAMS', res.data)
      }).catch(err => console.log(err))
    },
    deleteExam ({ commit }, examId) {
      Api().delete(`exams/${examId}/delete`).then(() => console.log('deleted')).catch(err => console.log(err))
    }
  }
})
