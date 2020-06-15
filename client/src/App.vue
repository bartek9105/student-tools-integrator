<template>
  <div id="app">
    <v-app id="inspire" :style="{background: $vuetify.theme.themes[theme].background}">
      <Snackbar />
      <SideNav/>
      <Topbar />
      <v-content>
        <v-container>
          <router-view />
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import Snackbar from '@/components/Snackbar'
import SideNav from '@/components/SideNav'
import Topbar from '@/components/Topbar'

export default {
  name: 'App',
  components: {
    Snackbar,
    SideNav,
    Topbar
  },
  computed: {
    theme () {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    }
  }
}
</script>

<style lang="scss">
  a {
    text-decoration: none;
  }
</style>
