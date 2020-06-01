import Api from '../services/Api'

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
      return Api().get('tasks')
        .then(result => {
          commit('SET_TASKS', result.data)
        })
        .catch(error => console.log(error))
    }
  }
})
