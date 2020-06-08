<template>
  <div id="app">
    <v-app id="inspire" :style="{background: $vuetify.theme.themes[theme].background}">
      <Snackbar />
      <v-navigation-drawer
        v-if="!$route.meta.hideNav"
        v-model="drawer"
        app
        clipped
        dark
      >
        <v-list>
          <router-link to="/">
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>dashboard</v-icon>
              </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>Dashboard</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>

          <router-link to="/subjects">
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>subject</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>Subjects</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>

          <router-link to="/calendar" class="d-flex align-center">
            <v-list-item link>
              <v-list-item-icon>
                  <v-badge
                    v-if="getUpcomingEvents"
                    color="green"
                    :content="getUpcomingEvents"
                  >
                    <v-icon>calendar_today</v-icon>
                  </v-badge>
                  <v-icon v-else>calendar_today</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>
                  Calendar
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>

          <router-link to="/schedule">
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>schedule</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>Schedule</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>

          <router-link to="/todo">
            <v-list-item link>
              <v-list-item-icon>
                  <v-badge
                    v-if="getTasksNumber"
                    color="green"
                    :content="getTasksNumber"
                  >
                    <v-icon>list</v-icon>
                  </v-badge>
                  <v-icon v-else>list</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>
                    To do list
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>

          <router-link to="/exams">
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>list_alt</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>Exams</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>

          <router-link to="/offers">
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>local_offer</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>Offers</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar
        v-if="!$route.meta.hideNav"
        app
        clipped-left
        dense
        class="elevation-2"
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
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

export default {
  name: 'App',
  components: {
    Snackbar
  },
  data: () => ({
    drawer: null
  }),
  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.$store.dispatch('showSnackbar', {
        snackbar: true,
        color: 'success',
        text: 'Successfully logged out'
      })
    }
  },
  computed: {
    theme () {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    },
    getUpcomingEvents () {
      return this.$store.getters.upcomingEventsGetter.length
    },
    getTasksNumber () {
      return this.$store.getters.getTasks.length
    }
  }
}
</script>

<style lang="scss">
  a {
    text-decoration: none;
  }
</style>
