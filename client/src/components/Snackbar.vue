<template>
  <div class="text-center">
    <v-snackbar
      v-model="snackbarOptions.snackbar"
      :timeout="timeout"
      :color="snackbarOptions.color"
    >
      {{ snackbarOptions.text }}
      <v-btn
        color
        text
        @click="snackbarOptions.snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  data () {
    return {
      timeout: 2500,
      snackbarOptions: {
        snackbar: false,
        text: '',
        color: ''
      }
    }
  },
  created () {
    this.$store.watch(state => state.notifications.snackbar, () => {
      const options = this.$store.state.notifications.snackbar
      if (options) {
        this.snackbarOptions = options
      }
    })
  }
}
</script>

<style>

</style>
