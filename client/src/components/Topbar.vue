<template>
  <v-card v-if="!$route.meta.hideNav" class="overflow-hidden elevation-0" :style="{navBackground: $vuetify.theme.themes[theme].background}">
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
      <v-icon class="mr-5">
        brightness_2
      </v-icon>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-icon
            v-on="on"
            class="mr-3"
          >
            notifications
          </v-icon>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-list-item-avatar>
        <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
      </v-list-item-avatar>

      <router-link to="/login">
        <span @click="logout" class="ml-5">Logout</span>
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
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' }
      ]
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
  },
  computed: {
    theme () {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    }
  }
}
</script>

<style>

</style>
