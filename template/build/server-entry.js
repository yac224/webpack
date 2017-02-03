import { app, router, store } from '../src/app'
export default context => {
  store.commit('userAgent/SET_AGENT', context.ua)
  router.push(context.url)
  return Promise.all(router.getMatchedComponents().map(component => {
    if (component.preFetch) {
      return component.preFetch(store)
    }
  })).then(() => {
    context.initialState = store.state
    context.meta = app.$meta()
    return app
  })
}

