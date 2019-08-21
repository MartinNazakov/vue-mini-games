<template>
  <v-snackbar
    v-model="show"
    :bottom="y === 'bottom'"
    :left="x === 'left'"
    :right="x === 'right'"
    :timeout="timeout"
    :color="type"
    :top="y === 'top'"
  >
    {{message}}
    <v-btn dark flat @click="closeSnackbar">
      <v-icon>close</v-icon>
    </v-btn>
    <!-- <v-btn flat color="accent" @click.native="show = false">Close</v-btn> -->
  </v-snackbar>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      show: false,
      message: "",
      type: "",
      x: "right",
      y: "top",
      timeout: 3000
    };
  },
  computed: mapState({
    snackbar: state => state.snackbar.snackbar
  }),
  watch: {
    snackbar(newValue, oldValue) {
      const msg = this.snackbar.message;
      if (msg !== "") {
        this.show = true;
        this.type = this.snackbar.type;
        this.message = this.snackbar.message;
      }
    }
  },
  methods: {
    closeSnackbar() {
      this.show = false;
    }
  }
};
</script>