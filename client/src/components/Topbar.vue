<template>
  <v-card v-if="!$route.meta.hideNav" class="overflow-hidden elevation-0">
    <v-app-bar
      absolute
      scroll-target="#scrolling-techniques-7"
    >
      <v-spacer></v-spacer>
      <v-switch
        v-model="$vuetify.theme.dark"
        hide-details
        inset
      ></v-switch>
      <v-icon class="mr-2">
        brightness_2
      </v-icon>
      <v-icon>notifications</v-icon>

      <v-list-item-avatar>
        <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
      </v-list-item-avatar>

      <router-link to="/login">
        <span @click="logout" class="ml-3">Logout</span>
      </router-link>

    </v-app-bar>
    <v-sheet
      id="scrolling-techniques-7"
      class="overflow-y-auto"
      max-height="600"
    >
      <v-container style="height: 60px;">

      </v-container>
    </v-sheet>
  </v-card>
</template>

<script>
export default {
  name: 'Topbar',
  data () {
    return {

    }
  },
  methods: {
    logout () {
      this.$store.dispatch('showSnackbar', {
        snackbar: true,
        color: 'success',
        text: 'Successfully logged out'
      })
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style>

</style>
