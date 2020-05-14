import axios from 'axios'

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
    }
  },
  actions: {
    getEvents ({ commit }) {
      return axios.get('http://localhost:3000/events').then(events => {
        commit('SET_EVENTS', events.data)
      }).catch(err => {
        console.log(err)
      })
    }
  }
})
