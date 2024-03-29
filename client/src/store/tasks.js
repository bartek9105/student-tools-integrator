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
    addTask ({ commit, dispatch }, task) {
      Api().post('tasks/add', task).then(() => {
        dispatch('fetchTasks')
      }).catch(err => console.log(err))
    },
    editTask ({ commit, dispatch }, task) {
      Api().patch(`tasks/${task._id}/edit`, {
        name: task.name,
        project: task.project,
        priority: task.priority,
        dueDate: task.dueDate
      }).then(() => {
        dispatch('fetchTasks')
      }).catch(err => console.log(err))
    },
    deleteTask ({ commit, dispatch }, taskId) {
      Api().delete(`tasks/${taskId}/delete`).then(() => {
        dispatch('fetchTasks')
      }).catch(err => console.log(err))
    }
  }
})
