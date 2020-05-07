export default ({
  state: {
    snackbar: null
  },
  mutations: {
    SET_SNACKBAR (state, payload) {
      state.snackbar = payload
    }
  },
  actions: {
    showSnackbar ({ commit }, payload) {
      commit('SET_SNACKBAR', payload)
    }
  }
})
