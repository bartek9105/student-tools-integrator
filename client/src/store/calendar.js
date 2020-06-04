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
    deleteEvent ({ commit }, id) {
      Api().delete(`events/delete/${id}`).then().catch(err => console.log(err))
    }
  }
})
