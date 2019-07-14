<template>
  <UserDashboard />
</template>

<script>
import Vue from "vue";
import UserDashboard from "@/components/UserDashboard.vue"; // @ is an alias to /src

export default {
  name: "dashboard",
  components: {
    UserDashboard
  }
};
</script>
