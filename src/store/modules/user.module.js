import axios from 'axios';
import router from '../../router';

export default {
  state: {
    email: '',
    birthDate: '',
  },
  mutations: {
    setEmail(state, email) {
      state.email = email;
    },
    setBirthDate(state, birthDate) {
      state.birthDate = birthDate;
    }
  },
  actions: {
    fetchUserData({
      state,
      commit,
      rootState
    }) {
      axios({
          url: 'http://localhost:5000/users/user?username=' + rootState.auth.username,
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
            this.dispatch("toggleSnackbar", {
              show: true,
              type: 'error',
              message: err.response.data.message
            });
          } else {
            this.dispatch("toggleSnackbar", {
              show: true,
              type: 'error',
              message: err.response.data.message
            });
          }
          router.push("/");
        })
    },
    updateUserInfo({
      state,
      commit,
      rootState
    }, userinfo) {
      return axios({
          url: 'http://localhost:5000/users/updateInfo?username=' + rootState.auth.username,
          data: userinfo,
          method: 'POST'
        })
        .then(() => {
          this.dispatch('toggleSnackbar', {
            show: true,
            type: 'success',
            message: 'Information Updated!'
          })
        })
        .catch(err => {
          if (err.response.status === 401) {
            this.dispatch("logout")
            this.dispatch('toggleSnackbar', {
              show: true,
              type: 'error',
              message: err.response.data.message
            });

          } else {
            this.dispatch('toggleSnackbar', {
              show: true,
              type: 'error',
              message: 'Failed to update user information!'
            })
          }
        })
    }
  },
  getters: {
    email: (state) => {
      return state.email;
    },
    birthDate: (state) => {
      return state.birthDate;
    }
  }
}
