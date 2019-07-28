import axios from 'axios';

export default {
  state: {
    lobby: {
      id: '',
      host: '',
      gameType: '',
      maxPlayers: 0,
    },
    loggedUsers: [],
    showLobby: false,
    lobbiesList: [],
    showLobbieslist: false
  },
  mutations: {
    setLobby(state, lobbyData) {
      state.lobby = Object.assign({}, lobbyData)
    },
    toggleLobby(state, shouldShow) {
      state.showLobby = shouldShow
    },
    toggleLobbiesList(state, shouldShow) {
      state.showLobbieslist = shouldShow
    },
    logUserToLobby(state, user) {
      if (state.loggedUsers.indexOf(user) === -1) {
        state.loggedUsers.push(user);
      }
    },
    setLobbiesList(state, lobbies) {
      state.lobbiesList = lobbies
    },
    removeUserFromLobby(state, username) {
      state.loggedUsers = state.loggedUsers.filter(user => {
        return user !== username;
      })
    },
    removeAllUsersFromLobby(state) {
      state.loggedUsers = [];
    },
  },
  actions: {
    createLobby({
      commit
    }, params) {
      params.io.emit('createLobby', {
        lobby: params.lobby
      });
    },
    joinLobby({
      commit
    }, params) {
      params.io.emit('joinLobby', {
        lobbyId: params.lobbyId,
        user: params.user
      });
      commit('toggleLobbiesList', false);
    },
    leaveLobby({
      commit
    }, params) {
      params.io.emit('leaveLobby', {
        lobbyId: params.lobbyId,
        user: params.user
      });

      const lobby = {
        id: '',
        host: '',
        gameType: '',
        maxPlayers: 0
      }

      commit('setLobby', lobby);
      commit('toggleLobby', false);
    },
    removeLobby({
      commit,
      state
    }, params) {
      params.io.emit('deleteLobby', {
        lobbyId: state.lobby.id
      });
    },
    getLobbiesForGame({
      commit
    }, gameType) {
      axios({
          url: 'http://localhost:5000/lobbies?gameType=' + gameType,
          method: 'GET'
        })
        .then(resp => {
          const lobbiesList = resp.data;
          commit('setLobbiesList', lobbiesList);
          commit('toggleLobbiesList', true);
        })
        .catch(err => {
          if (err.response.status === 404) {
            commit('toggleSnackbar', {
              show: true,
              type: 'info',
              message: err.response.data.message
            });
          } else {
            commit('toggleSnackbar', {
              show: true,
              type: 'error',
              message: err.data.message
            });
          }
          commit('toggleLobbiesList', false);
        })
    },
    SOCKET_setLobby({
      commit
    }, lobby) {
      commit('setLobby', lobby);
      commit('logUserToLobby', lobby.host);
      commit('toggleLobby', true);
    },
    SOCKET_removeLobby({
      commit
    }) {
      const lobby = {
        id: '',
        host: '',
        gameType: '',
        maxPlayers: 0
      }
      console.log('recieved socket remove lobby event');
      commit('setLobby', lobby);
      commit('removeAllUsersFromLobby');
      commit('toggleLobby', false);

      commit('toggleSnackbar', {
        show: true,
        type: 'info',
        message: 'Lobby closed'
      });
    },
    SOCKET_joinUser({
      commit
    }, user) {
      commit('logUserToLobby', user);
    },
    SOCKET_leaveLobby({
      commit
    }, user) {
      commit('removeUserFromLobby', user);
    },
    toggleLobbiesList({
      commit
    }, show) {
      commit("toggleLobbiesList", show);
    }
  },
  getters: {
    lobby: (state) => {
      return state.lobby;
    },
    lobbyVisible: (state) => {
      return state.showLobby;
    },
    lobbiesListVisible: (state) => {
      return state.showLobbieslist;
    },
    lobbiesList: (state) => {
      return state.lobbiesList;
    },
    loggedUsers: (state) => {
      return state.loggedUsers;
    }
  }
}
