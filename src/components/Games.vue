<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex v-for="game of games" :key="game.title" xs12 sm6 md4>
        <v-card class="mx-auto">
          <v-img class="white--text" height="200px" :src="game.imageSrc">
            <v-card-title class="align-end fill-height justify-center title">{{game.title}}</v-card-title>
          </v-img>
          <v-card-text>
            <span class="text--primary">
              <span v-if="game.maxPlayers">{{game.maxPlayers}} players</span>
              <br />
              <span>{{game.description}}</span>
            </span>
          </v-card-text>

          <v-card-actions class="justify-center">
            <v-btn @click="generateLobby(game.type, game.maxPlayers)" text color="white">Create</v-btn>
            <v-btn text color="blue">Join</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <Lobby />
  </v-container>
</template>

<script>
import Vue from "vue";
import Lobby from "./Lobby";

export default {
  name: "Games",
  data: function() {
    return {
      games: [
        {
          title: "Tic-Tac-Toe",
          description: "A classic game of Tic-Tac-Toe",
          imageSrc: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
          type: "TicTacToe",
          maxPlayers: 2
        },
        {
          title: "Tic-Tac-Toe 2",
          description: "A classic game of Tic-Tac-Toe 2",
          imageSrc: "https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        },
        {
          title: "Tic-Tac-Toe 3",
          description: "A classic game of Tic-Tac-Toe 3",
          imageSrc: "https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        },
        {
          title: "Tic-Tac-Toe 4",
          description: "A classic game of Tic-Tac-Toe 4",
          imageSrc: "https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        },
        {
          title: "Tic-Tac-Toe 5",
          description: "A classic game of Tic-Tac-Toe 5",
          imageSrc: "https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        }
      ]
    };
  },
  components: {
    Lobby: Lobby
  },
  methods: {
    generateLobby: function(gameType, maxPlayers) {
      const lobbyData = {
        host: this.getUsername,
        gameType: gameType,
        maxPlayers: maxPlayers
      };

      this.$store
        .dispatch("createlobby", lobbyData)
        .then(() => {
          this.$store.dispatch("showLobby").then(() => {
            this.$store.dispatch("logUserToLobby", { io: this.$socket });
          });
        })
        .catch(err => {
          this.$store.dispatch("hideLobby");
        });
    }
  },
  computed: {
    getUsername() {
      return this.$store.getters["username"];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
