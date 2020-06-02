<template>
  <v-container>
    <div class="d-flex justify-space-between align-center">
      <Breadcrumbs/>
      <v-btn class="primary" @click="dialog = true">Add</v-btn>
    </div>
    <AddScheduleDialog v-model="dialog"/>
    <v-simple-table class="elevation-1">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left table-header">
              <v-icon class="mr-2">class</v-icon>
              Class
            </th>
            <th class="text-left table-header">
              <v-icon class="mr-2">calendar_today</v-icon>
              Day
            </th>
            <th class="text-left table-header">
              <v-icon class="mr-2">schedule</v-icon>
              Time
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in getSchedule" :key="event._id">
            <td>
              <router-link :to="'subject/' + event.subject"> {{ event.title }} </router-link>
            </td>
            <td v-if="event.daysOfWeek">
              <span class="font-weight-medium">Every {{ days[event.daysOfWeek] }}</span>
              ({{ event.startRecur}} - {{ event.endRecur }})
            </td>
            <td v-else>
              <span class="font-weight-medium">{{ days[new Date(event.start).getDay()] }} </span>
              ({{ event.start }})
            </td>
            <td>
              {{ event.startTime }} - {{ event.endTime }}
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
  td:not(:first-child) {
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .table-header {
    padding-top: 20px !important;
    padding-bottom: 20px !important;
  }
</style>
