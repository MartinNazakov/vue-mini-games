<template>
  <Register />
</template>

<script lang="ts">
import Vue from "vue";
import Register from "@/components/Register.vue"; // @ is an alias to /src

export default Vue.extend({
  name: "register",
  components: {
    Register
  }
});
</script>
