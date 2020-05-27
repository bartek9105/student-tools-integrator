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
    <div v-for="el in schedule" :key="el._id" class="mt-8">
      <p class="caption-1">{{ el._id }}</p>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="subject in el.subjectDetails" :key="subject.subjectId">
              <td>
                <router-link :to="'subject/' + subject.subjectId">{{ subject.title}}</router-link>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
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
      selectedClass: null,
      schedule: null
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
    async getSchedule () {
      try {
        const schedule = await axios.get('http://localhost:3000/events/getByDate')
        this.schedule = schedule.data
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
  },
  mounted () {
    this.getSchedule()
  }
}
</script>

<style>

</style>
