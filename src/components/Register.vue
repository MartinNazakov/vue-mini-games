<template>
  <v-app>
    <v-container>
      <div class="register">
        <h1>Register</h1>
        <v-layout align-center xs12 sm6 md4 justify-center row fill-height>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="formInputs.username"
              :counter="6"
              :rules="usernameRules"
              label="username"
              required
            ></v-text-field>

            <v-text-field
              v-model="formInputs.password"
              :counter="6"
              :rules="passwordRules"
              :append-icon="passwordVisible ? 'visibility' : 'visibility_off'"
              :type="passwordVisible ? 'text' : 'password'"
              label="password"
              hint="At least 6 characters"
              required
              @click:append="passwordVisible = !passwordVisible"
            ></v-text-field>

            <v-btn :disabled="!valid" color="success" @click="validate">Validate</v-btn>
          </v-form>
        </v-layout>
      </div>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

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
        v => (v && v.length >= 6) || "Username must be more than 6 characters"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => (v && v.length >= 6) || "Password must be more than 6 characters"
      ],
      valid: true,
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
      if (this.form.validate()) {
        // this.snackbar = true;
      }
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
