import Api from '../services/Api'

export default ({
  state: {
    events: []
  },
  getters: {
    eventsGetter (state) {
      return state.events
    },
    upcomingEventsGetter (state) {
      const today = new Date()
      return state.events.filter(el => {
        if (el.start) {
          return new Date(el.start.substr(0, 10)) && new Date(el.end.substr(0, 10)) >= today
        } else if (el.startRecur) {
          return new Date(el.startRecur.substr(0, 10)) && new Date(el.endRecur.substr(0, 10)) >= today
        }
      })
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
      Api().patch(`events/exam/edit/${exam.examId}`, {
        title: exam.selectedClass.name + ' exam',
        start: exam.start + `T${exam.startTime}`,
        end: exam.start + `T${exam.endTime}`,
        subject: exam.selectedClass._id,
        room: exam.room,
        color: exam.color
      }).then(() => {
        dispatch('getEvents')
      }).catch(err => console.log(err))
    },
    editScheduleEvent ({ commit, dispatch }, exam) {
      Api().patch(`events/schedule/edit/${exam.eventId}`, {
        title: exam.title,
        start: exam.start,
        end: exam.end,
        subject: exam.subject,
        room: exam.room
      }).then(() => {
        dispatch('getEvents')
      }).catch(err => {
        console.log(err)
      })
    },
    editRecurringScheduleEvent ({ commit, dispatch }, event) {
      Api().patch(`events/scheduleRecurring/edit/${event.eventId}`, {
        title: event.title,
        subject: event.subject,
        room: event.room,
        startRecur: event.startRecurence,
        endRecur: event.endRecurence,
        daysOfWeek: event.daysOfWeek,
        startTime: event.startTime,
        endTime: event.endTime
      }).then(() => {
        dispatch('getEvents')
      }).catch(err => console.log(err))
    }
  }
})
