<template>
  <div id="app">
    <div id="nav">
      <Navbar />
    </div>
    <Snackbar />
    <router-view />
  </div>
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
}
#nav {
  padding: 0;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
