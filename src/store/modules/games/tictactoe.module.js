import axios from 'axios';
import router from '../../../router';

export default {
    state: {
        game: {
            id: '',
            currentPlayerTurn: '',
            board: [[]],
            players: []
        }
    },
    mutations: {
        setGame(state, game) {
            state.game = game;
        },
    },
    actions: {
        startGame({
            commit,
            rootState
        }, params) {
            console.log(rootState);
            params.io.emit('startGame', {
                lobbyId: rootState.lobby.lobby.id,
                gameType: params.gameType,
                players: rootState.loggedUsers
            });
        },
        joinGameRoom({ }, params) {
            params.io.emit('joinGameRoom', {
                id: params.id
            });
        },
        SOCKET_startGame({
            commit
        }, game) {
            commit('setGame', game);
        },
        SOCKET_goToGame({ }) {
            router.push("tictactoe");
        },
    },
    getters: {
        game: (state) => {
            return state.game;
        }
    }
}
