export default {
  state: {
    snackbar: {
      show: false,
      message: '',
      type: ''
    }
  },
  mutations: {
    toggleSnackbar: function (state, snackbarConfig) {
      state.snackbar = snackbarConfig;
    }
  },
  actions: {
    toggleSnackbar({
      commit
    }, snackbarConfig) {
      commit('toggleSnackbar', snackbarConfig)
    }
  },
  getters: {}
}
