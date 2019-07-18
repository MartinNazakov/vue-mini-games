<template>
  <v-navigation-drawer app fixed clipped :stateless="!drawer" v-model="open">
    <v-list two-line>
      <v-list-tile v-for="(item, index) in filteredItems" :key="index" :to="item.route">
        <v-list-tile-content>
          <v-list-tile-title v-html="item.title"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile></v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Drawer",
  props: ["drawer"],
  data() {
    return {
      theme: false,
      items: [
        {
          route: "/",
          title: "Home",
          requireAuth: false
        },
        {
          route: "/rankings",
          title: "Rankings",
          requireAuth: false
        },
        {
          route: "/games",
          title: "Games",
          requireAuth: false
        },
        {
          route: "/login",
          title: "Login",
          requireAuth: true
        },
        {
          route: "/register",
          title: "Register",
          requireAuth: true
        }
      ]
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
    },
    isUserAuthenticated() {
      return this.$store.getters["loggedIn"];
    },
    filteredItems() {
      return this.items.filter(
        item => item.visibleCondition === undefined || item.visibleCondition
      );
    }
  }
};
</script>
