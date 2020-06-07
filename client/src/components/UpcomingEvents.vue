<template>
  <v-container>
    <div class="d-flex flex-column mb-4">
      <h3 class="mr-4 mb-4">Upcoming events</h3>
      <router-link to="/calendar">Go to calendar view</router-link>
    </div>
    <div v-if="getUpcomingEvents == 0">
      <p>No upcoming events</p>
    </div>
    <v-simple-table v-else class="elevation-2">
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
            <td v-if="event.start">{{ event.start.substr(0, 10) }} - {{ event.end.substr(0, 10) }}</td>
            <td v-if="event.startRecur">
              <span class="font-weight-medium">Every {{ days[event.daysOfWeek] }}</span>
              {{ event.startRecur }} - {{ event.endRecur }}
            </td>
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
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
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
