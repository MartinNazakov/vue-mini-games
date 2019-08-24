import axios from 'axios';
import router from '../../../router';

export default {
  state: {
    game: {
      id: '',
      currentPlayerTurn: '',
      currentPlayerSymbol: '',
      board: [
        []
      ],
      players: [],
      winner: ''
    }
  },
  mutations: {
    setGame(state, game) {
      state.game = game;
    },
    setWinner(state, winner) {
      state.game.winner = winner;
    },
  },
  actions: {
    startGame({
      commit,
      rootState
    }, params) {
      console.log(params);
      params.io.emit('startGame', {
        lobbyId: rootState.lobby.lobby.id,
        gameType: params.gameType,
        players: params.players
      });
    },
    makeMove({}, params) {
      params.io.emit('makeMove', {
        x: params.x,
        y: params.y,
        id: params.id
      })
    },
    joinGameRoom({}, params) {
      params.io.emit('joinGameRoom', {
        id: params.id
      });
    },
    getStartPlayer({}) {

    },
    SOCKET_winner({
      commit,
      rootState
    }, winner) {
      const currentPlayer = rootState.auth.username;
      if (currentPlayer === winner) {
        commit('toggleSnackbar', {
          show: true,
          type: 'success',
          message: 'You win!'
        });
      } else {
        commit('toggleSnackbar', {
          show: true,
          type: 'error',
          message: 'You lose!'
        });
      }
      router.push("rankings");
    },
    SOCKET_noWinner({
      commit
    }) {

      commit('toggleSnackbar', {
        show: true,
        type: 'info',
        message: 'Draw. No winners!'
      });
      router.push("rankings");
    },
    SOCKET_illegalMove({
      commit
    }) {
      commit('toggleSnackbar', {
        show: true,
        type: 'info',
        message: 'This field has already been occupied!'
      });
    },
    SOCKET_startGame({
      commit
    }, game) {
      commit('setGame', game);
    },
    SOCKET_goToGame({}) {
      router.push("tictactoe");
    },
    SOCKET_makeMove({
      commit
    }, game) {
      commit('setGame', game);
    }
  },
  getters: {
    game: (state) => {
      return state.game;
    }
  }
}
