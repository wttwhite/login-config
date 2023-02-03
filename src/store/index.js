import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import pageConfig from './modules/page-config'

export default new Vuex.Store({
  //   state: {},
  //   getters: {},
  //   mutations: {},
  //   actions: {},
  modules: {
    pageConfig,
  },
})
