<template>
    <v-container>
      <div class="login">
        <h1>Login</h1>
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
              <v-btn :disabled="!valid || sending" color="success" @click="validate">Login</v-btn>
            </v-form>
          </v-flex>
        </v-layout>
      </div>
    </v-container>
</template>

<script>
import Vue from "vue";

export default {
  name: "Login",
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
      passwordVisible: false,
      sending: false
    };
  },
  methods: {
    validate: function() {
      if (this.$refs.form.validate()) {
        this.login();
      }
    },
    login: function() {
      const userData = {
        username: this.formInputs.username,
        password: this.formInputs.password
      };
  
      this.sending = true;
      this.$store
        .dispatch("login", userData)
        .catch(err => console.log(err))
        .then(() => (this.sending = false));
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
