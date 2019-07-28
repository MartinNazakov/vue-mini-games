import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios';
import router from './router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    snackbar: {
      show: false,
      message: '',
      type: ''
    },
    accessToken: localStorage.getItem('token') || null,
    username: localStorage.getItem('username') || '',
    email: '',
    birthDate: '',
    rankings: [],
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
    toggleSnackbar: function (state, snackbarConfig) {
      state.snackbar = snackbarConfig;
    },
    loginStatus(state, payload) {
      state.accessToken = payload.accessToken
      state.username = payload.username
    },
    setUsername(state, username) {
      state.username = username;
    },
    setEmail(state, email) {
      state.email = email;
    },
    setBirthDate(state, birthDate) {
      state.birthDate = birthDate;
    },
    setRankings(state, rankings) {
      state.rankings = rankings;
    },
    setLobby(state, lobbyData) {
      state.lobby = Object.assign({}, lobbyData)
    },
    toggleLobby(state, shouldShow) {
      state.showLobby = shouldShow
    },
    SOCKET_logUserToLobby(state, user) {
      state.lobby.loggedUsers.push(user);
    }
  },
  actions: {
    toggleSnackbar({
      commit
    }, snackbarConfig) {
      commit('toggleSnackbar', snackbarConfig)
    },
    fetchUserData({
      commit
    }) {
      axios({
          url: 'http://localhost:5000/users/user?username=' + this.state.username,
          method: 'GET'
        })
        .then(userData => {
          commit('setUsername', userData.data.username);
          commit('setEmail', userData.data.email);
          commit('setBirthDate', userData.data.birthDate);
        }).catch(err => {
          if (err.response.status === 401) {
            // logout user
            this.dispatch("logout");

            commit('toggleSnackbar', {
              show: true,
              type: 'error',
              message: err.response.data.message
            });
          } else {
            commit('toggleSnackbar', {
              show: true,
              type: 'error',
              message: 'Error fetching user data!'
            });
          }
          router.push("/");
        })
    },
    register({
      commit
    }, user) {
      return new Promise((resolve, reject) => {
        axios({
            url: 'http://localhost:5000/users/register',
            data: user,
            method: 'POST'
          })
          .then(resp => {
            commit('toggleSnackbar', {
              show: true,
              type: 'success',
              message: 'Registration successful!'
            })
            resolve(resp)
          })
          .catch(err => {
            if (err.response.status === 409) {
              commit('toggleSnackbar', {
                show: true,
                type: 'error',
                message: err.response.data.message
              })
            } else {
              commit('toggleSnackbar', {
                show: true,
                type: 'error',
                message: 'Unexpected error occured!'
              })
            }
            reject(err)
          })
      })
    },
    login({
      commit
    }, user) {
      axios({
          url: 'http://localhost:5000/users/login',
          data: user,
          method: 'POST'
        })
        .then(resp => {
          const token = resp.data.token;
          const username = resp.data.username;

          localStorage.setItem('token', token);
          localStorage.setItem('username', username);

          axios.defaults.headers.common['Authorization'] = token;

          commit('loginStatus', {
            accessToken: token,
            username: resp.data.username
          });

          commit('toggleSnackbar', {
            show: true,
            type: 'success',
            message: 'Login successful!'
          })
          router.push("dashboard");

        })
        .catch(err => {

          if (err.response.status === 404) {
            commit('toggleSnackbar', {
              show: true,
              type: 'error',
              message: 'User not found!'
            });
          } else {
            commit('toggleSnackbar', {
              show: true,
              type: 'error',
              message: err.message
            });
            // logout user
            this.dispatch("logout");
          }
        })
    },
    logout({
      commit
    }) {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      axios.defaults.headers.common['Authorization'] = '';

      commit('loginStatus', {
        accessToken: '',
        username: ''
      });
      commit('toggleSnackbar', {
        show: true,
        type: 'info',
        message: 'Logged out!'
      });
      router.push("/");
    },
    updateUserInfo({
      commit
    }, userinfo) {
      return axios({
          url: 'http://localhost:5000/users/updateInfo?username=' + this.state.username,
          data: userinfo,
          method: 'POST'
        })
        .then(() => {
          commit('toggleSnackbar', {
            show: true,
            type: 'success',
            message: 'Information Updated!'
          })
        })
        .catch(err => {
          if (err.response.status === 401) {
            this.dispatch("logout")
            commit('toggleSnackbar', {
              show: true,
              type: 'error',
              message: err.response.data.message
            });

          } else {
            commit('toggleSnackbar', {
              show: true,
              type: 'error',
              message: 'Failed to update user information!'
            })
          }
        })
    },
    fetchRankings({
      commit
    }) {
      return axios({
          url: 'http://localhost:5000/users/rankings',
          method: 'GET'
        })
        .then(resp => {
          commit('setRankings', resp.data);
        })
        .catch(err => {
          commit('toggleSnackbar', {
            show: true,
            type: 'error',
            message: 'Failed load user rankings!'
          })
        })
    },
    createlobby({
      commit
    }, lobbyData) {
      return axios({
          url: 'http://localhost:5000/lobbies/create',
          data: lobbyData,
          method: 'POST'
        })
        .then(response => {
          console.log(response.data.lobbyData);
          commit('setLobby', response.data.lobbyData);
          commit('toggleSnackbar', {
            show: true,
            type: 'success',
            message: 'Lobby Created!'
          })
        })
        .catch(err => {})
    },
    removeLobby({
      commit
    }) {
      commit('setLobby', {
        host: '',
        gameType: '',
        maxPlayers: 0,
        loggedusers: []
      });
    },
    showLobby({
      commit
    }) {
      commit('toggleLobby', true);
    },
    hideLobby({
      commit
    }) {
      commit('toggleLobby', false);
    },
    socket_logUserToLobby({
      commit,
      state
    }, params) {
      params.io.emit('enterLobby', {
        lobby: state.lobby,
        user: state.username
      });
    }
  },
  getters: {
    loggedIn: (state) => {
      return state.accessToken ? true : false
    },
    username: (state) => {
      return state.username;
    },
    email: (state) => {
      return state.email;
    },
    birthDate: (state) => {
      return state.birthDate;
    },
    rankings: (state) => {
      return state.rankings;
    },
    lobby: (state) => {
      return state.lobby;
    },
    lobbyVisible: (state) => {
      return state.showLobby;
    }
  }
})
