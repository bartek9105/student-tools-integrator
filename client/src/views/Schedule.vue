<template>
  <v-container>
    <div class="d-flex justify-space-between align-center">
      <Breadcrumbs/>
      <v-btn class="primary" @click="dialog = true">Add</v-btn>
    </div>
    <AddScheduleDialog v-model="dialog"/>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Day</th>
            <th class="text-left">Reccuring</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in getSchedule" :key="event._id">
            <td>
              <router-link :to="'subject/' + event.subject"> {{ event.title }} </router-link>
            </td>
            <td>
              {{ days[new Date(event.start).getDay()] }} ({{ event.start }})
            </td>
            <td v-if="event.daysOfWeek">
              Every {{ days[event.daysOfWeek] }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>

import Breadcrumbs from '@/components/Breadcrumbs'
import AddScheduleDialog from '@/components/AddScheduleDialog'

export default {
  name: 'Schedule',
  components: {
    Breadcrumbs,
    AddScheduleDialog
  },
  data () {
    return {
      dialog: false,
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }
  },
  methods: {
    fetchSchedule () {
      this.$store.dispatch('getEvents')
    },
    pickStartTime (startTime) {
      this.startTime = startTime
    },
    pickEndTime (endTime) {
      this.endTime = endTime
    },
    pickStartDate (startDate) {
      this.start = startDate
    },
    pickEndDate (endDate) {
      this.end = endDate
    },
    selected (e) {
      console.log(e)
    }
  },
  computed: {
    getSchedule () {
      return this.$store.getters.eventsGetter.filter(el => el.subject)
    }
  },
  mounted () {
    this.fetchSchedule()
  }
}
</script>

<style>

</style>
