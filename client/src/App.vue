<template>
  <v-app style="background-color: #F8F8F8">
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
  }
}
</script>

<style lang="scss">
  a {
    text-decoration: none;
  }
</style>
