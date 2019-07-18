<template>
  <v-navigation-drawer class="blue darken-3" app fixed clipped :stateless="!drawer" v-model="open">
    <v-list two-line>
      <v-list-tile v-for="(item, index) in filteredItems" :key="index" :to="item.route">
        <v-list-tile-content>
          <v-list-tile-title class="white--text white--darken-2" v-html="item.title"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile></v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Drawer",
  props: ["drawer", "filteredItems"],
  data() {
    return {
      theme: false
    };
  },
  computed: {
    mode: {
      get() {
        return this.theme;
      },
      set(value) {
        this.theme = value;
      }
    },
    open: {
      get() {
        return this.drawer;
      },
      set(value) {
        this.$emit("drawer:update", value);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  #nav-drawer {
    background-color: #0265ab;
  }
</style>

