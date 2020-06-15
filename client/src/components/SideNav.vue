<template>
    <v-navigation-drawer
        v-if="!$route.meta.hideNav"
        :value="getDrawerState"
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
</template>

<script>
export default {
  name: 'SideNav',
  data () {
    return {
    }
  },
  computed: {
    getUpcomingEvents () {
      return this.$store.getters.upcomingEventsGetter.length
    },
    getTasksNumber () {
      return this.$store.getters.getTasks.length
    },
    getDrawerState () {
      return this.$store.state.drawer
    }
  }
}
</script>
<style>

</style>
