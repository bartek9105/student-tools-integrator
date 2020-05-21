import axios from 'axios'

export default ({
  state: {
    tasks: []
  },
  mutations: {
    SET_TASKS (state, tasks) {
      state.tasks = tasks
    }
  },
  getters: {
    getTasks (state) {
      return state.tasks
    }
  },
  actions: {
    fetchTasks ({ commit }) {
      return axios.get('http://localhost:3000/tasks')
        .then(result => {
          commit('SET_TASKS', result.data)
        })
        .catch(error => console.log(error))
    }
  }
})
