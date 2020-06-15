<template>
  <v-app-bar
    v-if="!$route.meta.hideNav"
    app
    clipped-left
    dense
    class="elevation-2"
  >
    <v-app-bar-nav-icon @click.stop="changeDrawerState"></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <v-icon class="mr-5">
      brightness_5
    </v-icon>
    <v-switch
      v-model="$vuetify.theme.dark"
      hide-details
      inset
    ></v-switch>
    <v-icon>
      brightness_2
    </v-icon>
    <router-link to="/login">
      <span @click="logout" class="ml-5">Logout</span>
      <v-icon class="ml-4">exit_to_app</v-icon>
    </router-link>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Topbar',
  data () {
    return {
      drawer: null
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.$store.dispatch('showSnackbar', {
        snackbar: true,
        color: 'success',
        text: 'Successfully logged out'
      })
    },
    changeDrawerState () {
      this.$store.commit('SHOW_SIDEBAR')
    }
  }
}
</script>

<style>

</style>
