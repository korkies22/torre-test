export default {
  state() {
    return {
      url:
        process.env.NODE_ENV !== 'production'
          ? 'http://localhost:4000/'
          : 'https://AAA/',
    }
  },

  getters: {
    // Here we will create a getter
    url(state) {
      return state.url
    },
  },

  mutations: {
    // Here we will create Jenny
  },

  actions: {
    // Here we will create Larry
  },
  strict: false,
}
