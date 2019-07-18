<template>
  <v-layout>
    <v-flex xs12 sm12 md6 offset-sm3>
      <v-card v-for="(game, index) in games" :key="index">
        <v-img
          class="white--text"
          height="200px"
          v-bind:src="game.imageSrc"
        >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 sm12 md6 align-end flexbox>
                <span class="headline">{{game.title}}</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
      </v-card>
      <!-- <v-card>
        <v-img
          class="white--text"
          height="200px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline">Top 10 Australian beaches</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
        <v-card-title>
          <div>
            <span class="grey--text">Number 10</span>
            <br />
            <span>Whitehaven Beach</span>
            <br />
            <span>Whitsunday Island, Whitsunday Islands</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange">Share</v-btn>
          <v-btn flat color="orange">Explore</v-btn>
        </v-card-actions>
      </v-card>-->
    </v-flex>
  </v-layout>
</template>

<script>
import Vue from "vue";
import axios from "axios";

export default {
  name: "Games",
  data: function() {
    return {
      games: [
        {
          title: "Tic-Tac-Toe",
          description: "A classic game of Tic-Tac-Toe",
          imageSrc: "https://cdn.vuetifyjs.com/images/cards/docks.jpg"
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
        }
      ]
    };
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
