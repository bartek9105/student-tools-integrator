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
    },
    addOffer ({ commit, dispatch }, offer) {
      Api().post('offers/add', {
        title: offer.title,
        description: offer.description,
        contact: offer.contact
      }).then(() => {
        dispatch('fetchOffers')
      }).catch(err => console.log(err))
    },
    editOffer ({ commit, dispatch }, offer) {
      Api().patch(`offers/${offer.offerId}/edit`, {
        title: offer.title,
        description: offer.description,
        contact: offer.contact
      }).then(() => {
        dispatch('fetchOffers')
      }).catch(err => console.log(err))
    },
    deleteOffer ({ commit, dispatch }, offerId) {
      Api().delete(`offers/${offerId}/delete`).then(() => {
        dispatch('fetchOffers')
      }).catch(err => console.log(err))
    }
  }
})
