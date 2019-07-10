import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios';
import User from './models/User';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: {
      registerStatus: '',
    },
    authStatus: '',
    token: '',
    user: {}
  },
  mutations: {
    registerRequest: function (state) {
      state.auth.registerStatus = 'loading'
    },
    registerSuccess: function (state, payload) {
      state.auth.registerStatus = 'success'
    },
    registerError: function (state) {
      state.auth.registerStatus = 'error'
    }
  },
  actions: {
    register({ commit }, user: User) {
      return new Promise((resolve, reject) => {
        commit('registerRequest')
        axios({ url: 'http://localhost:5000/users/register', data: user, method: 'POST' })
          .then(resp => {
            commit('registerSuccess')
            resolve(resp)
          })
          .catch(err => {
            commit('registerError')
            reject(err)
          })
      })
    },
    login({ commit }, user: User) {
      commit('authRequest')
      axios({ url: 'http://localhost:5000/users/login', data: user, method: 'POST' })
        .then(resp => {
          const token = resp.data.token
          const user = resp.data.user
          localStorage.setItem('token', token)

          axios.defaults.headers.common['Authorization'] = token
          commit('authSuccess', token, user)
        })
        .catch(err => {
          commit('authError', err)
          localStorage.removeItem('token')
        })
    }
  },
  getters: {
    registerStatus: state => state.auth.registerStatus
  }
})
