<template>
  <v-layout row wrap>
    <v-flex xs12 sm12 md12>
      <v-toolbar :color="navbar.color" :dark="navbar.color">
        <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
        <v-toolbar-title>{{navbar.title}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn flat>
            <router-link to="/">Home</router-link>
          </v-btn>
          <v-btn v-show="!isUserAuthenticated" flat>
            <router-link to="/login">Login</router-link>
          </v-btn>
          <v-btn v-show="!isUserAuthenticated" flat>
            <router-link to="/register">Register</router-link>
          </v-btn>
          <v-btn @click="logout" v-show="isUserAuthenticated" flat>
            <router-link to="/">Logout</router-link>
          </v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>search</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>favorite</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>more_vert</v-icon>
        </v-btn>
      </v-toolbar>
    </v-flex>
  </v-layout>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";

export default {
  name: "Navbar",
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
      return this.$store.getters["getUserAuthStatus"];
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
