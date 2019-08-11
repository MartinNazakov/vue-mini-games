import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import auth from './modules/auth.module';
import user from './modules/user.module';
import snackbar from './modules/snackbar.module';
import rankings from './modules/rankings.module';
import lobby from './modules/lobby.module';
import tictactoe from './modules/games/tictactoe.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    user,
    snackbar,
    rankings,
    lobby,
    tictactoe
  }
})
