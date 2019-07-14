<template>
  <v-layout row wrap>
    <v-flex xs12 sm12 md12>
      <v-toolbar :color="navbar.color" :dark="navbar.color">
        <v-toolbar-title>{{navbar.title}}</v-toolbar-title>
        <v-toolbar-items class="pl-5">
          <v-btn flat>
            <router-link to="/">Home</router-link>
          </v-btn>
          <v-btn v-show="!isUserAuthenticated" flat>
            <router-link to="/login">Login</router-link>
          </v-btn>
          <v-btn v-show="!isUserAuthenticated" flat>
            <router-link to="/register">Register</router-link>
          </v-btn>
          <v-btn flat>
            <router-link to="/rankings">Rankings</router-link>
          </v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <NavUserActions v-show="isUserAuthenticated"></NavUserActions>
      </v-toolbar>
    </v-flex>
  </v-layout>
</template>

<script>
import Vue from "vue";
import NavUserActions from "./NavUserActions";

export default {
  name: "Navbar",
  components: {
    NavUserActions
  },
  data: function() {
    return {
      navbar: {
        title: "Vue Mini Games",
        color: "dark"
      }
    };
  },
  computed: {
    isUserAuthenticated() {
      return this.$store.getters["loggedIn"];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
