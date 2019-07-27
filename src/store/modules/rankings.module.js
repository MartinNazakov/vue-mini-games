import axios from 'axios';

export default {
  state: {
    rankings: [],
  },
  mutations: {
    setRankings(state, rankings) {
      state.rankings = rankings;
    }
  },
  actions: {
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
          this.dispatch('toggleSnackbar', {
            show: true,
            type: 'error',
            message: 'Failed load user rankings!'
          })
        })
    }
  },
  getters: {
    rankings: (state) => {
      return state.rankings;
    }
  }
}
