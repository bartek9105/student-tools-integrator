<template>
  <v-container>
    <Breadcrumbs/>
    <v-form @submit.prevent="addSchedule">
      <v-select
        return-object
        :items="getSubjects"
        label="Select class"
        item-text="name"
        solo
        v-model="selectedClass"
      ></v-select>
      <DatePicker v-on:pickDate="pickStartDate($event)"/>
      <DatePicker v-on:pickDate="pickEndDate($event)"/>
      <TimePicker v-on:pickTime="pickStartTime($event)"/>
      <TimePicker v-on:pickTime="pickEndTime($event)"/>
      <v-btn class="primary" type="submit">Add</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import axios from 'axios'

import Breadcrumbs from '@/components/Breadcrumbs'
import TimePicker from '@/components/TimePicker'
import DatePicker from '@/components/DatePicker'

export default {
  name: 'Schedule',
  components: {
    Breadcrumbs,
    TimePicker,
    DatePicker
  },
  data () {
    return {
      start: null,
      end: null,
      startTime: null,
      endTime: null,
      selectedClass: null
    }
  },
  methods: {
    async addSchedule () {
      try {
        await axios.post('http://localhost:3000/events/add', {
          title: this.selectedClass.name,
          start: this.start,
          end: this.end,
          startTime: this.startTime,
          endTime: this.endTime,
          subject: this.selectedClass._id,
          daysOfWeek: null
        })
      } catch (error) {
        console.log(error)
      }
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
    getSubjects () {
      return this.$store.getters.getSubjects
    }
  }
}
</script>

<style>

</style>
