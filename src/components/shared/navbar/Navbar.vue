<template>
  <v-layout row wrap>
    <v-flex xs12 sm12 md12>
      <Drawer :drawer.sync="drawer" :filtered-items="filteredItems"></Drawer>
      <v-toolbar xs12 sm12 md12 class="pa-5" flat color="transparent">
        <!-- <v-icon color="light-green" x-large>whatshot</v-icon> -->
        <v-flex id="menu-items-container" xs12 sm12 md12>
          <v-toolbar-items md12>
            <v-flex class="menu-item hidden-lg-and-up" xs12 sm12 md12>
              <v-btn flat @click.native="drawer = !drawer">
                <v-icon color="white">menu</v-icon>
              </v-btn>
            </v-flex>
            <v-flex class="menu-item hidden-md-and-down" xs12 sm12 md12>
              <v-btn v-for="(item, index) in filteredItems" :key="index" flat>
                <router-link :to="item.route">{{item.title}}</router-link>
              </v-btn>
            </v-flex>
            <v-flex class="menu-item" xs12 sm12 md12>
              <v-toolbar-title
                :class="{'headline': $vuetify.breakpoint.md, 'subheading': $vuetify.breakpoint.xs}"
                class="headline font-weight-black"
                id="logo-text"
              >P L A Y G R O U N D</v-toolbar-title>
            </v-flex>
            <v-flex class="menu-item" xs12 sm12 md12>
              <NavUserActions v-show="isUserAuthenticated"></NavUserActions>
            </v-flex>
          </v-toolbar-items>
        </v-flex>
      </v-toolbar>
    </v-flex>
  </v-layout>
</template>

<script>
import Vue from "vue";
import NavUserActions from "./NavUserActions";
import Drawer from "./Drawer";

export default {
  name: "Navbar",
  components: {
    NavUserActions,
    Drawer
  },
  data: function() {
    return {
      navbar: {
        title: "Vue Mini Games"
      },
      items: [
        {
          route: "/",
          title: "Home",
          requireAuth: false,
          showWhenAuthorized: true
        },
        {
          route: "/rankings",
          title: "Rankings",
          requireAuth: true,
          showWhenAuthorized: true
        },
        {
          route: "/games",
          title: "Games",
          requireAuth: true,
          showWhenAuthorized: true
        },
        {
          route: "/login",
          title: "Login",
          requireAuth: false,
          showWhenAuthorized: false
        },
        {
          route: "/register",
          title: "Register",
          requireAuth: false,
          showWhenAuthorized: false
        }
      ],
      drawer: false
    };
  },
  computed: {
    isUserAuthenticated() {
      return this.$store.getters["loggedIn"];
    },
    filteredItems() {
      return this.items.filter(
        item =>
          (item.requireAuth && this.isUserAuthenticated) ||
          (!item.requireAuth && !this.isUserAuthenticated) ||
          (!item.requireAuth &&
            this.isUserAuthenticated &&
            item.showWhenAuthorized)
      );
    }
  },
  methods: {
    handler() {
      this.drawer = false;
    }
  },
  watch: {
    drawer: {
      handler: function(value) {
        this.$nextTick(() => {
          try {
            if (value) {
              document
                .querySelector(".v-overlay")
                .addEventListener("click", this.handler);
            } else {
              document
                .querySelector(".v-overlay")
                .removeEventListener("click", this.handler);
            }
          } catch (e) {}
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@font-face {
  font-family: "Luckiest Guy";
  font-style: normal;
  font-weight: 400;
  src: local("Luckiest Guy Regular"), local("LuckiestGuy-Regular"),
    url(https://fonts.gstatic.com/s/luckiestguy/v9/_gP_1RrxsjcxVyin9l9n_j2hTd52.woff2)
      format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
    U+FEFF, U+FFFD;
}

#menu-items-container {
  height: 100%;
  button {
    height: 100%;
  }
  .menu-item {
    height: 100%;
  }
}

#logo-text {
  // text-shadow: 1px 1px 3px #000000;
  overflow: visible;
  position: relative;
  top: 5px;
  display: inline-block;
  -webkit-animation: bounce 0.3s ease infinite alternate;
  font-size: 80px;
  color: #fff;
  text-shadow: 0 1px 0 #ccc, 0 2px 0 #ccc, 0 3px 0 #ccc, 0 4px 0 #ccc,
    0 5px 0 #ccc, 0 6px 0 transparent, 0 7px 0 transparent, 0 8px 0 transparent,
    0 9px 0 transparent, 0 10px 10px rgba(0, 0, 0, 0.4);
}
@-webkit-keyframes bounce {
  100% {
    top: -5px;
    text-shadow: 0 1px 0 #ccc, 0 2px 0 #ccc, 0 3px 0 #ccc, 0 4px 0 #ccc,
      0 5px 0 #ccc, 0 6px 0 #ccc, 0 7px 0 #ccc, 0 8px 0 #ccc, 0 9px 0 #ccc,
      0 50px 25px rgba(0, 0, 0, 0.2);
  }
}
</style>
