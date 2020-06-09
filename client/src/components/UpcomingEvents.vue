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
            <th class="text-left">Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in getUpcomingEvents" :key="event._id">
            <td>{{ event.title }}</td>
            <td v-if="event.start">
              <div>
                <v-icon class="mr-2">today</v-icon>
                {{ event.start.substr(0, 10) }} <span v-if="event.start.substr(0, 10)!==event.end.substr(0, 10)">- {{ event.end.substr(0, 10) }}</span>
              </div>
            </td>
            <td v-if="event.start">
              <div>
                <v-icon class="mr-2">schedule</v-icon>
                {{ event.start.substr(11, 15) }} - {{ event.end.substr(11, 15) }}
              </div>
            </td>
            <td v-if="event.startRecur">
              <div>
                <span class="font-weight-medium">
                <v-icon class="mr-2">date_range</v-icon> Every {{ days[event.daysOfWeek] }} ({{ event.startRecur }} - {{ event.endRecur }})
                </span>
              </div>
            </td>
            <td v-if="event.startRecur">
              <div>
                <v-icon class="mr-2">schedule</v-icon> {{ event.startTime }} - {{ event.endTime }}
              </div>
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

<style scoped>
  td:not(:first-child) {
    padding-top: 25px;
    padding-bottom: 25px;
  }
</style>
