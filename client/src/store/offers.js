import Api from '../services/Api'

export default ({
  state: {
    offers: []
  },
  getters: {
    getOffers (state) {
      return state.offers
    }
  },
  mutations: {
    SET_OFFERS (state, offers) {
      state.offers = offers
    }
  },
  actions: {
    fetchOffers ({ commit }) {
      return Api().get('offers').then(res => {
        commit('SET_OFFERS', res.data)
      }).catch(err => console.log(err))
    }
  }
})
