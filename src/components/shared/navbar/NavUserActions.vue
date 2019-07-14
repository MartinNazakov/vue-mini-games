<template>
  <v-menu offset-y content-class="dropdown-menu" transition="slide-y-transition">
    <v-btn slot="activator">
      <v-icon>account_circle</v-icon>
    </v-btn>
    <v-card>
      <v-list dense>
        <v-list-tile v-for="action in actions" :key="action.name" @click="action.action">
          <v-list-tile-title v-text="action.name" />
        </v-list-tile>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
import Vue from "vue";

export default {
  name: "NavUserActions",
  data: function() {
    return {
      actions: [
        { name: "Dashboard", action: this.dashboard },
        { name: "Logout", action: this.logout }
      ]
    };
  },
  computed: {
    isUserAuthenticated() {
      return this.$store.getters["loggedIn"];
    }
  },
  methods: {
    dashboard() {
      this.$router.push("dashboard");
    },
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
