import Api from '../services/Api'

export default ({
  state: {
    projects: []
  },
  getters: {
    getProjects (state) {
      return state.projects
    }
  },
  mutations: {
    SET_PROJECTS (state, projects) {
      state.projects = projects
    }
  },
  actions: {
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
