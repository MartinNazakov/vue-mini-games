export default {
  state: {
    lobby: {
      id: '',
      host: '',
      gameType: '',
      maxPlayers: 0,
      loggedUsers: []
    },
    showLobby: false
  },
  mutations: {
    toggleLobby(state, shouldShow) {
      state.showLobby = shouldShow
    },
  },
  actions: {
    toggleSnackbar({
      commit
    }, snackbarConfig) {
      commit('toggleSnackbar', snackbarConfig)
    }
  },
  getters: {
    lobbyVisible: (state) => {
      return state.showLobby;
    }
  }
}
