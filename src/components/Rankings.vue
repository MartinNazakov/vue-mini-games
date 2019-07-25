<template>
  <v-container>
    <div class="dashboard">
      <h1 class="text-main">Rankings - Top 20</h1>
      <v-data-table
        :headers="headers"
        :items="getUserRankings"
        :search="search"
        hide-actions
        class="elevation-1"
      >
        <template v-slot:items="props">
          <td class="text-xs-left">{{ props.index + 1 }}</td>
          <td class="text-xs-left">{{ props.item.username }}</td>
          <td class="text-xs-left">{{ props.item.wins }}</td>
        </template>
      </v-data-table>
    </div>
  </v-container>
</template>

<script>
import Vue from "vue";

export default {
  name: "Rankings",
  data: function() {
    return {
      search: "",
      selected: [],
      headers: [
        { text: "#", align: "left", value: "position", sortable: false },
        { text: "Username", align: "left", value: "username" },
        { text: "Wins", value: "wins" }
      ]
    };
  },
  computed: {
    getUserRankings() {
      return this.$store.getters["rankings"];
    }
  },
  created() {
    this.fetchRankings();
  },
  methods: {
    fetchRankings() {
      this.$store.dispatch("fetchRankings");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
