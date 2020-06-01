import Api from '../services/Api'

export default ({
  state: {
    subjects: [],
    subjectDetails: []
  },
  getters: {
    getSubjects (state) {
      return state.subjects
    },
    getSubjectDetails (state) {
      return state.subjectDetails
    }
  },
  mutations: {
    SET_SUBJECTS (state, subjects) {
      state.subjects = subjects
    },
    SET_SUBJECT_DETAILS (state, subject) {
      state.subjectDetails = subject
    },
    ADD_SUBJECT (state, subject) {
      state.subjects.push(subject)
    },
    ADD_REQUIREMENT (state, requirement) {
      state.subjectDetails.requirements.push(requirement)
    }
  },
  actions: {
    fetchSubjects ({ commit }) {
      return Api().get('subjects').then(res => {
        commit('SET_SUBJECTS', res.data)
      }).catch(err => console.log(err))
    },
    addSubject ({ commit }, subject) {
      Api().post('subjects/add', subject).then(result => {
        commit('ADD_SUBJECT', result.data.subject)
      }).catch(err => console.log(err))
    },
    fetchSubjectDetails ({ commit }, subjectId) {
      Api().get(`subjects/${subjectId}`).then(res => {
        commit('SET_SUBJECT_DETAILS', res.data).catch(err => console.log(err))
      })
    },
    addRequirement ({ commit }, payload) {
      Api().patch(`subjects/${payload.subjectId}/updateRequirements`, {
        requirement: payload.requirement,
        progress: payload.progress
      }).then(res => {
        commit('ADD_REQUIREMENT', res)
      }).catch(err => console.log(err))
    },
    editRequirement ({ commit }, payload) {
      Api().patch(`subjects/${payload.reqId}/editRequirements`, {
        requirement: payload.requirement,
        progress: payload.progress
      }).then(() => {
      }).catch(err => console.log(err))
    },
    deleteRequirement ({ commit, dispatch }, payload) {
      Api().patch(`subjects/${payload.subjectId}/deleteRequirement/${payload.reqId}`).then(() => {
        dispatch('fetchSubjectDetails', payload.subjectId)
      }).catch(err => console.log(err))
    }
  }
})
