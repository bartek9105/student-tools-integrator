import Api from '../services/Api'

export default ({
  state: {
    events: []
  },
  getters: {
    eventsGetter (state) {
      return state.events
    }
  },
  mutations: {
    SET_EVENTS (state, events) {
      state.events = events
    },
    ADD_EVENT (state, event) {
      state.events.push(event)
    }
  },
  actions: {
    getEvents ({ commit }) {
      return Api().get('events').then(events => {
        commit('SET_EVENTS', events.data)
      }).catch(err => {
        console.log(err)
      })
    },
    addEvent ({ commit, dispatch }, payload) {
      Api().post('events/add', payload).then(() => {
        dispatch('getEvents')
      }).catch(err => console.log(err))
    },
    deleteEvent ({ commit, dispatch }, id) {
      Api().delete(`events/delete/${id}`).then(() => {
        dispatch('getEvents')
      }).catch(err => console.log(err))
    },
    editExamEvent ({ commit, dispatch }, exam) {
      Api().patch(`events/exam/edit/${exam._id}`, {
        title: exam.subject.name + ' exam',
        start: exam.start + `T${exam.startTime}`,
        subject: exam.subject._id,
        room: exam.room
      }).then(() => {
        dispatch('getEvents')
      }).catch(err => console.log(err))
    }
  }
})
