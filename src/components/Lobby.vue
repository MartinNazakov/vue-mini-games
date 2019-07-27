<template>
  <v-layout justify-center>
    <v-dialog :value="getLobbyVisible" width="600px">
      <v-card>
        <v-card-title class="justify-center">
          <v-icon color="green" class="pr-4">check_circle</v-icon>
          <span class="headline">{{getLobby.host}}'s lobby created!</span>
          <v-icon color="green" class="pl-4">check_circle</v-icon>
        </v-card-title>
        <v-card-text></v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="closeLobby()">Cancel</v-btn>
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
  methods: {
    closeLobby() {
      this.$store.dispatch("hideLobby");
    }
  },
  computed: {
    getLobbyVisible() {
      return this.$store.getters["lobbyVisible"];
    },
    getLobby() {
      return this.$store.getters["lobby"];
    },
    getUsername() {
      return this.$store.getters["username"];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
