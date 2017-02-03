import { app, store } from 'src/app'
store.replaceState(window.__INITIAL_STATE__)
app.$mount('#app')

