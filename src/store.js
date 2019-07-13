import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios';
import router from './router';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    snackbar: {
      show: false,
      message: '',
      type: ''
    },
    accessToken: localStorage.getItem('token') || null,
    username: ''
  },
  mutations: {
    toggleSnackbar: function (state, snackbarConfig) {
      state.snackbar = snackbarConfig;
    },
    loginStatus(state, payload) {
      state.accessToken = payload.accessToken
      state.username = payload.username
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
          const token = resp.data.token;

          localStorage.setItem('token', token);
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
          router.push("/");

        })
        .catch(err => {
          localStorage.removeItem('token');
          axios.defaults.headers.common['Authorization'] = '';

          commit('loginStatus', {
            accessToken: '',
            username: ''
          });

          commit('toggleSnackbar', {
            show: true,
            type: 'error',
            message: err.message
          });
        })
    },
    logout({
      commit
    }) {
      localStorage.removeItem('token');
      commit('loginStatus', {
        accessToken: '',
        username: ''
      });
      commit('toggleSnackbar', {
        show: true,
        type: 'info',
        message: 'Logged out!'
      });
    }
  },
  getters: {
    loggedIn: (state) => {
      return state.accessToken ? true : false
    }
  }
})
