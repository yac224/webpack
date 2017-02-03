require('es6-promise').polyfill()
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const AppModule = {
  state: {
    msg: 'Welcome to Your Vue.js App'
  }
}
const store = new Vuex.Store({
  modules: {
    app: AppModule,
  }
})
export default store

