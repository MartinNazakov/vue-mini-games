<template>
  <v-layout justify-center>
    <v-dialog :value="getLobbiesListVisible" width="600px" persistent>
      <v-card>
        <v-card-title v-for="lobby of getLobbiesList" :key="lobby.id">
          <div @click="joinLobby(lobby.id)" class="justify-center lobby-container pa-2">
            <span class="headline">{{lobby.host}}'s lobby</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="closeList()">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import Vue from "vue";

export default {
  name: "LobbiesList",
  data: function() {
    return {};
  },
  methods: {
    joinLobby(lobbyId) {
      const data = {
        user: this.getUsername,
        lobbyId: lobbyId,
        io: this.$socket
      };
      this.$store.dispatch("joinLobby", data);
    },
    leaveLobby(lobbyId) {
      const data = {
        user: this.getUsername,
        io: this.$socket,
        lobbyId: lobbyId
      };
      this.$store.dispatch("leaveLobby", data);
    },
    closeList() {
      this.$store.dispatch("toggleLobbiesList", false);
    }
  },
  computed: {
    getLobbiesListVisible() {
      return this.$store.getters["lobbiesListVisible"];
    },
    getLobbiesList() {
      return this.$store.getters["lobbiesList"];
    },
    getUsername() {
      return this.$store.getters["username"];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.lobby-container {
  cursor: pointer;
  background-color: #f1f1f1;
  border-radius: 50px 0px 50px 0px;
  width: 80%;
  margin: 0 auto;
}
</style>
