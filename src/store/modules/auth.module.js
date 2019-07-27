import axios from 'axios';
import router from '../../router';

export default {
  state: {
    accessToken: localStorage.getItem('token') || null,
    username: localStorage.getItem('username') || ''
  },
  mutations: {
    loginStatus(state, payload) {
      state.accessToken = payload.accessToken
      state.username = payload.username
    },
    setUsername(state, username) {
      state.username = username;
    }
  },
  actions: {
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
            this.dispatch('toggleSnackbar', {
              show: true,
              type: 'success',
              message: 'Registration successful!'
            })
            resolve(resp)
          })
          .catch(err => {
            if (err.response.status === 409) {
              this.dispatch('toggleSnackbar', {
                show: true,
                type: 'error',
                message: err.response.data.message
              })
            } else {
              this.dispatch('toggleSnackbar', {
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

          this.dispatch('toggleSnackbar', {
            show: true,
            type: 'success',
            message: 'Login successful!'
          })
          router.push("dashboard");

        })
        .catch(err => {

          if (err.response.status === 404) {
            this.dispatch('toggleSnackbar', {
              show: true,
              type: 'error',
              message: 'User not found!'
            });
          } else {
            this.dispatch('toggleSnackbar', {
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
      this.dispatch('toggleSnackbar', {
        show: true,
        type: 'info',
        message: 'Logged out!'
      });
      router.push("/");
    }
  },
  getters: {
    loggedIn: (state) => {
      return state.accessToken ? true : false
    },
    username: (state) => {
      return state.username;
    }
  }
}
