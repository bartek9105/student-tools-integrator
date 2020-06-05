<template>
  <v-container>
    <div class="d-flex align-center mb-8">
      <h3 class="mr-4">Upcoming events</h3>
      <router-link to="/calendar">Go to calendar view</router-link>
    </div>
    <div v-if="getEvents == 0">
      <p>No upcoming events</p>
    </div>
    <v-simple-table v-else>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Event</th>
            <th class="text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in getUpcomingEvents" :key="event._id">
            <td>{{ event.title }}</td>
            <td v-if="event.start">{{ event.start.substr(0, 10) }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
export default {
  name: 'UpcomingEvents',
  data () {
    return {

    }
  },
  computed: {
    getUpcomingEvents () {
      return this.$store.getters.upcomingEventsGetter
    }
  }
}
</script>

<style>

</style>
