<template>
  <v-app>
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
              <v-alert
                v-model="successAlert.show"
                :type="successAlert.type"
                :dismissible="successAlert.dismissible"
                class="mb-3"
                transition="scale-transition"
              >{{ successAlert.message }}</v-alert>

              <v-btn :disabled="!valid || sending" color="success" @click="validate">Login</v-btn>
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
      sending: false,
      successAlert: {
        show: false,
        type: "success",
        message: "",
        dismissible: true
      },
      errorAlert: {
        show: false,
        type: "error",
        message: "",
        dismissible: true
      }
    };
  },
  created() {
    // if user has registered, the username will come from the route
    // and it can be auto-completed in the input
    this.formInputs.username = this.$route.params.username || "";

    // show alert that user has been registered successfully
    this.successAlert.message = "Registration successful! You can now login.";
    this.successAlert.show = true;
  },
  computed: {
    // needed, because typescript needs to know the type of the form object
    form(): Vue & { validate: () => boolean } {
      return this.$refs.form as Vue & { validate: () => boolean };
    }
  },
  methods: {
    validate() {
      this.successAlert.show = false;
      if (this.form.validate()) {
        this.login();
      }
    },
    login() {
      let _this = this;
      this.sending = true;
      axios
        .post("http://localhost:5000/users/login", this.formInputs)
        .then(response => {
          //   this.$router.push({
          //     name: "login",
          //     params: { username: this.formInputs.username }
          //   });
        })
        .catch(err => {
          // user already exists
          if (err.response.status === 409) {
            _this.errorAlert.message = err.response.data.message;
          } else _this.errorAlert.message = "An unknown error occured!";

          _this.errorAlert.show = true;
        })
        .then(function() {
          _this.sending = false;
        });
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
