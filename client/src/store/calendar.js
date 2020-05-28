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
    },
    ADD_EVENT (state, event) {
      state.events.push(event)
    }
  },
  actions: {
    getEvents ({ commit }) {
      return axios.get('http://localhost:3000/events').then(events => {
        commit('SET_EVENTS', events.data)
      }).catch(err => {
        console.log(err)
      })
    },
    addEvent ({ commit }, payload) {
      axios.post('http://localhost:3000/events/add', payload).then(result => {
        commit('ADD_EVENT', result.data.event)
      }).catch(err => console.log(err))
    }
  }
})
