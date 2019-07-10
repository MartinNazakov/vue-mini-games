<template>
  <Login />
</template>

<script lang="ts">
import Vue from "vue";
import Login from "@/components/Login.vue"; // @ is an alias to /src

export default Vue.extend({
  name: "login",
  components: {
    Login
  }
});
</script>
