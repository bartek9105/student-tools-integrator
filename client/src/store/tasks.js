import Api from '../services/Api'

export default ({
  state: {
    tasks: [],
    projects: []
  },
  getters: {
    getTasks (state) {
      return state.tasks
    },
    getProjects (state) {
      return state.projects
    }
  },
  mutations: {
    ADD_TASK (state, task) {
      state.tasks.push(task)
    },
    SET_TASKS (state, tasks) {
      state.tasks = tasks
    },
    SET_PROJECTS (state, projects) {
      state.projects = projects
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
    },
    fetchProjects ({ commit }) {
      return Api().get('projects').then(res => {
        commit('SET_PROJECTS', res.data)
      }).catch(err => console.log(err))
    },
    addProject ({ commit, dispatch }, project) {
      Api().post('projects/add', {
        name: project.projectName,
        color: project.color
      }).then(() => {
        dispatch('fetchProjects')
      }).catch(err => console.log(err))
    },
    editProject ({ commit, dispatch }, project) {
      Api().patch(`projects/${project._id}/edit`, {
        name: project.name,
        color: project.color
      }).then(() => {
        dispatch('fetchProjects')
      }).catch(err => console.log(err))
    },
    deleteProject ({ commit, dispatch }, projectId) {
      Api().delete(`projects/${projectId}/delete`).then(() => {
        dispatch('fetchProjects')
      }).catch(err => console.log(err))
    }
  }
})
