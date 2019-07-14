<template>
  <v-container>
    <div class="dashboard">
      <h1>Dashboard</h1>
      <v-layout align-center justify-center row fill-height>
        <v-flex xs12 sm6 md4>
          <v-form ref="form" lazy-validation>
            <v-text-field v-model="getUsername" label="username" disabled></v-text-field>
            <v-text-field v-model="email" :rules="emailRules" label="email"></v-text-field>
            <v-menu
              :close-on-content-click="true"
              v-model="showCalendar"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <v-text-field
                slot="activator"
                readonly
                v-model="birthDate"
                label="Birth Date"
                prepend-icon="event"
              ></v-text-field>

              <v-date-picker reactive :value="birthDate" @input="inputHandler"></v-date-picker>
            </v-menu>
            <v-btn color="success" @click="validate">Update profile</v-btn>
          </v-form>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import moment from "moment";

export default {
  name: "UserDashboard",
  data: function() {
    return {
      showCalendar: false,
      emailRules: [
        v => !!v || "E-mail is required",
        v => /[^@]+@[^.]+\..*/.test(v) || "Invalid E-mail"
      ]
    };
  },
  computed: {
    getUsername() {
      return this.$store.getters["username"];
    },
    email: {
      get: function() {
        return this.$store.getters["email"];
      },
      set: function(newValue) {
        this.updateEmail(newValue);
      }
    },
    birthDate: {
      get: function() {
        return this.$store.getters["birthDate"];
      },
      set: function(newValue) {
        this.updateBirthDate(newValue);
      }
    }
  },
  created() {
    this.$store.dispatch("fetchUserData");
  },
  methods: {
    inputHandler(date) {
      if (typeof date === "string") this.showCalendar = false;
      this.updateBirthDate(date);
    },
    formatDate(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    updateBirthDate(date) {
      this.$store.commit("setBirthDate", this.formatDate(date));
    },
    updateEmail(email) {
      this.$store.commit("setEmail", email);
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.updateUserInfo();
      }
    },
    updateUserInfo() {
      const userData = {
        email: this.email,
        birthDate: this.birthDate
      };

      this.$store
        .dispatch("updateUserInfo", userData)
        .catch(err => console.log(err));
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
