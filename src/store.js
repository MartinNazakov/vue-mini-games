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
    username: '',
    email: '',
    birthDate: '',
    rankings: []
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
          url: 'http://localhost:5000/users/user',
          method: 'GET'
        })
        .then(userData => {
          commit('setUsername', userData.data.username);
          commit('setEmail', userData.data.email);
          commit('setBirthDate', userData.data.birthDate);
        }).catch(err => {
          if (err.response.status === 401) {
            // logout user
            localStorage.removeItem('token');
            axios.defaults.headers.common['Authorization'] = '';

            commit('loginStatus', {
              accessToken: '',
              username: ''
            });

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
          router.push("dashboard");

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
      router.push("/");
    },
    updateUserInfo({
      commit
    }, userinfo) {
      return axios({
          url: 'http://localhost:5000/users/updateInfo',
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
          commit('toggleSnackbar', {
            show: true,
            type: 'error',
            message: 'Failed to update user information!'
          })
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
    }
  }
})
