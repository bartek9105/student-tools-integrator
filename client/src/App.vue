<template>
  <div id="app">
    <v-app id="inspire">
      <v-app id="inspire">
        <Snackbar />
        <v-navigation-drawer
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

            <router-link to="/calendar">
              <v-list-item link>
                <v-list-item-icon>
                  <v-icon>calendar_today</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>Calendar</v-list-item-title>
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
                      v-if="taskCount > 0"
                      color="green"
                      :content="taskCount"
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

            <router-link to="/events">
              <v-list-item link>
                <v-list-item-icon>
                  <v-icon>local_offer</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>Events</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </router-link>

          </v-list>
          <v-spacer></v-spacer>
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
          </v-list-item-avatar>
          <router-link to="/login">
            <span @click="logout" class="ml-5">Logout</span>
          </router-link>
          <v-icon class="ml-4">exit_to_app</v-icon>
        </v-navigation-drawer>

        <v-app-bar
          app
          clipped-left
          dense
          class="elevation-0"
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

        </v-app-bar>
        <v-content>
          <v-container>
            <router-view />
          </v-container>
        </v-content>
      </v-app>
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

<style lang="scss">
  a {
    text-decoration: none;
  }
</style>
