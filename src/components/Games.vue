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
            <v-btn @click="getLobbies(game.type)" text color="blue">Join</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <Lobby />
    <LobbiesList/>
  </v-container>
</template>

<script>
import Vue from "vue";
import Lobby from "./Lobby";
import LobbiesList from "./LobbiesList";

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
    Lobby: Lobby,
    LobbiesList: LobbiesList
  },
  methods: {
    generateLobby: function(gameType, maxPlayers) {
      // for now - pass the IO instance to the action
      // TO-DO - check if there is a better way to inject it in the store
      const data = {
        lobby: {
          host: this.getUsername,
          gameType: gameType,
          maxPlayers: maxPlayers
        },
        io: this.$socket
      };
      this.$store.dispatch("createLobby", data);
    },
    getLobbies: function(gameType) {
      this.$store.dispatch("getLobbiesForGame", gameType)
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
