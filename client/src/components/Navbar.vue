<template>
  <v-sheet>

    <v-navigation-drawer v-if="!$route.meta.hideNav" v-model="drawer" absolute dark expand-on-hover permanent class="elevation-1" style="z-index: 9999;">
      <div class="d-flex justify-center py-4">
        <v-icon>toll</v-icon>
      </div>
      <v-divider></v-divider>
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
              <v-icon>list</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>To do list</v-list-item-title>
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
  </v-sheet>
</template>

<script>
export default {
  data () {
    return {
      drawer: true
    }
  }
}
</script>

<style>
</style>
