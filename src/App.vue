<template>
  <v-app id="app">
    <div id="nav">
      <Navbar />
    </div>
    <Snackbar />
    <router-view />
  </v-app>
</template>

<script>
import Snackbar from "@/components/shared/Snackbar/Snackbar";
import Navbar from "@/components/shared/navbar/Navbar";

export default {
  components: {
    Navbar,
    Snackbar
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: linear-gradient(
    to right top,
    #aeb3b9,
    #7fa0d1,
    #5589e6,
    #3c6ef4,
    #4f47f8
  );
}
#nav {
  padding: 0;
  a {
    color: #ffffff;
    text-shadow: 0.5px 0.5px black;
    text-decoration: none;
    // font-weight: bold;
    // color: #2c3e50;
    // &.router-link-exact-active {
    //   color: #42b983;
    // }
  }
}

.text-main {
  color: #ffffff;
  text-shadow: 0.5px 0.5px black;
}
</style>
