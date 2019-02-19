import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var state = {
  fundRate: '3.25',
  businessRate: '4.90',
  localPopState: true
}

var mutations = {
  saveFundRate (state, fundRate) {
    state.fundRate = fundRate
  },
  saveBusinessRate (state, businessRate) {
    state.businessRate = businessRate
  },
  saveLocalPopState (state, localPopState) {
    state.localPopState = localPopState
  }
}

export default new Vuex.Store({
  state,
  mutations
})
