import Api from '../services/Api'

export default ({
  state: {
    tasks: []
  },
  getters: {
    getTasks (state) {
      return state.tasks
    }
  },
  mutations: {
    ADD_TASK (state, task) {
      state.tasks.push(task)
    },
    SET_TASKS (state, tasks) {
      state.tasks = tasks
    }
  },
  actions: {
    fetchTasks ({ commit }) {
      return Api().get('tasks')
        .then(result => {
          commit('SET_TASKS', result.data)
        })
        .catch(error => console.log(error))
    },
    addTask ({ commit }, task) {
      Api().post('tasks/add', task).then(res => {
        commit('ADD_TASK', res.data).catch(err => console.log(err))
      })
    },
    deleteTask ({ commit }, taskId) {
      Api().get(`tasks/${taskId}/delete`).then(() => console.log('deleted')).catch(err => console.log(err))
    }
  }
})
