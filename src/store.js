import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    snackbar: {
      show: false,
      message: '',
      type: ''
    },
    user: {
      username: '',
      isAuthenticated: false || localStorage.getItem('token'),
      token: localStorage.getItem('token') || null,
    }
  },
  mutations: {
    toggleSnackbar: function (state, snackbarConfig) {
      state.snackbar = snackbarConfig;
    },
    setUsername: function (state, username) {
      state.user.username = username;
    },
    setUserAuthenticated: function (state, isAuthenticated) {
      state.user.isAuthenticated = isAuthenticated;
    },
    setUser(state, user) {
      state.user = Object.assign({}, user);
    },
    updateAccessToken: (state, token) => {
      state.user.token = token;
    }
  },
  actions: {
    toggleSnackbar({
      commit
    }, snackbarConfig) {
      commit('toggleSnackbar', snackbarConfig)
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

          const isAuthenticated = resp.data.isAuthenticated;

          if (isAuthenticated) {

            const username = resp.data.username;
            const token = resp.data.token;

            commit('updateAccessToken', token);
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = token;

            commit('setUsername', username);
            commit('setUserAuthenticated', isAuthenticated);

            commit('toggleSnackbar', {
              show: true,
              type: 'success',
              message: 'Login successful!'
            })

          } else {
            // reset store user data and delete token from local storage
            localStorage.removeItem('token');
            commit('updateAccessToken', null);
            commit('setUser', {});
            commit('toggleSnackbar', {
              show: true,
              type: 'error',
              message: 'Login failed!'
            });
          }

        })
        .catch(err => {
          commit('toggleSnackbar', {
            show: true,
            type: 'error',
            message: err.message
          });
          localStorage.removeItem('token');
          commit('updateAccessToken', null);
        })
    },
    logout({
      commit
    }) {
      localStorage.removeItem('token');
      commit('updateAccessToken', null);
      commit('setUser', {});
      commit('toggleSnackbar', {
        show: true,
        type: 'info',
        message: 'Logged out!'
      });
    }
  },
  getters: {
    getUserAuthStatus: (state) => {
      return state.user.isAuthenticated;
    },
    getAccessToken: (state) => {
      return state.user.token;
    }
  }
})
