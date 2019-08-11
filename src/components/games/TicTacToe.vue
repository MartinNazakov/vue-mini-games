<template>
  <v-container>
    <v-layout justify-center>
      <v-flex v-for="(x, xIndex) in game.board" :key="xIndex">
        <v-card align-center class="ttt-cell" v-for="(y, yIndex) in x" :key="yIndex">
          <div class="ttt-cell-text">{{'|' + y + '|'}}</div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from "vue";

export default {
  name: "TicTacToe",
  data: function() {
    return {};
  },
  computed: {
    game() {
      return this.$store.getters["game"];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.ttt-cell {
  height: 150px;

  .ttt-cell-text {
    text-align: center;
    vertical-align: middle;
    line-height: 150px;
    font-size: 60px;
    border: 1px solid #0e889b;
  }
}
</style>
