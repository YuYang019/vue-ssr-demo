import Vue from 'vue'
import Vuex from 'vuex'
import foo from './modules/foo';
// import actions from './actions'
// import mutations from './mutations'
// import getters from './getters'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      user: null,
    },
    // modules: {
    //   foo
    // }
    // actions,
    // mutations,
    // getters
  })
}