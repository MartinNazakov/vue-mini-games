<template>
  <v-layout justify-center>
    <v-dialog :value="getLobbyVisible" width="600px" persistent>
      <v-card>
        <v-card-title class="justify-center">
          <v-icon color="green" class="pr-4">check_circle</v-icon>
          <span class="headline">{{getLobby.host}}'s lobby.</span>
          <v-icon color="green" class="pl-4">check_circle</v-icon>
        </v-card-title>
        <v-card-text>
          <div
            class="headline mb-1"
          >Users in lobby ({{getLoggedUsers.length}}/{{getLobby.maxPlayers}}):</div>
          <div v-for="loggedUser of getLoggedUsers" :key="loggedUser">
            {{loggedUser}}
            <span v-if="loggedUser === getLobby.host">(host)</span>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            v-if="getUsername === getLobby.host"
            text
            @click="closeLobby()"
          >Cancel</v-btn>
          <v-btn
            color="green darken-1"
            v-if="getUsername === getLobby.host"
            :disabled="startButtonDisabled"
            text
            @click="startGame(getLobby.id, getLobby.gameType, getLoggedUsers)"
          >Start</v-btn>
          <v-btn
            color="blue darken-1"
            v-if="getUsername !== getLobby.host"
            text
            @click="leaveLobby(getLobby.id)"
          >Leave</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import Vue from "vue";

export default {
  name: "Lobby",
  data: function() {
    return {};
  },
  created() {
    // add event listener before changing the page,
    //so the lobby can be handled properly
    window.addEventListener("unload", this.handlePageLeave);
  },
  beforeDestroy() {
    // remove event listeners
    window.removeEventListener("unload", this.handlePageLeave);
    this.handlePageLeave();
  },
  methods: {
    closeLobby() {
      this.$store.dispatch("removeLobby", { io: this.$socket });
    },
    leaveLobby(lobbyId) {
      const data = {
        user: this.getUsername,
        io: this.$socket,
        lobbyId: lobbyId
      };
      this.$store.dispatch("leaveLobby", data);
    },
    handlePageLeave() {
      // On route change - emit to socket to remove the lobby
      // or the user if they are not a host
      if (this.getUsername === this.getLobby.host) {
        this.closeLobby();
      } else if (this.getLoggedUsers.indexOf(this.getUsername) !== -1) {
        this.leaveLobby(this.getLobby);
      }
    },
    startGame(lobbyId, gameType, players) {
      const data = {
        id: lobbyId,
        gameType: gameType,
        io: this.$socket,
        players: players
      };
      console.log("starting game..");
      this.$store.dispatch("startGame", data);
    }
  },
  computed: {
    getLobbyVisible() {
      return this.$store.getters["lobbyVisible"];
    },
    getLobby() {
      return this.$store.getters["lobby"];
    },
    getLoggedUsers() {
      return this.$store.getters["loggedUsers"];
    },
    getUsername() {
      return this.$store.getters["username"];
    },
    startButtonDisabled() {
      return this.getLoggedUsers.length !== this.getLobby.maxPlayers;
    },
    game() {
      return this.$store.getters["game"];
    }
  },
  watch: {
    game(newValue, oldValue) {
      console.log(newValue);
      const gameId = newValue.id;
      if (gameId !== "") {
        const data = {
          io: this.$socket,
          id: gameId
        };

        this.$store.dispatch("joinGameRoom", data);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
