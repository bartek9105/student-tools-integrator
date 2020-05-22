<template>
  <v-app :style="{background: $vuetify.theme.themes[theme].background}">
    <Topbar/>
    <Navbar/>
    <Snackbar/>
    <router-view/>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
import Topbar from '@/components/Topbar'
import Snackbar from '@/components/Snackbar'

export default {
  name: 'App',
  components: {
    Navbar,
    Topbar,
    Snackbar
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
