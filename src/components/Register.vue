<template>
  <v-app>
    <v-container>
      <div class="register">
        <h1>Register</h1>
        <v-layout align-center justify-center row fill-height>
          <v-flex xs12 sm6 md4>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="formInputs.username"
                :rules="usernameRules"
                label="username"
                required
              ></v-text-field>

              <v-text-field
                v-model="formInputs.password"
                :rules="passwordRules"
                :append-icon="passwordVisible ? 'visibility' : 'visibility_off'"
                :type="passwordVisible ? 'text' : 'password'"
                label="password"
                hint="At least 4 characters"
                required
                @click:append="passwordVisible = !passwordVisible"
              ></v-text-field>

              <v-btn :disabled="!valid" color="success" @click="validate">Register</v-btn>
            </v-form>
          </v-flex>
        </v-layout>
      </div>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";

export default Vue.extend({
  name: "Register",
  data: function() {
    return {
      formInputs: {
        username: "",
        password: ""
      },
      usernameRules: [
        v => !!v || "Username is required",
        v => (v && v.length >= 4) || "Username must be more than 4 characters"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => (v && v.length >= 4) || "Password must be more than 4 characters"
      ],
      valid: false,
      passwordVisible: false
    };
  },
  computed: {
    // needed, because typescript needs to know the type of the form object
    form(): Vue & { validate: () => boolean } {
      return this.$refs.form as Vue & { validate: () => boolean };
    }
  },
  methods: {
    validate() {
      this.toggleNotification();
      if (this.form.validate()) {
        this.register();
      }
    },
    register() {
      let data = {
        username: this.formInputs.username,
        password: this.formInputs.password
      };

      this.$store
        .dispatch("register", data)
        .then(() => this.$router.push("login"))
        .catch(err => console.log(err));
    },
    toggleNotification() {
      this.$store.dispatch("toggleSnackbar", { show: true, message: "test", type: "success" });
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
