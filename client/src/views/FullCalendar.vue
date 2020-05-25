<template>
  <v-container>
      <v-btn class="primary" @click="dialog = true">Add event</v-btn>
      <FullCalendar
        defaultView="dayGridMonth"
        :plugins="calendarPlugins"
        :header="header"
        :events="events"
        :themeSystem="themeSystem"
        @eventClick="eventInfo"
      />
      <v-dialog v-model="dialog" max-width="500">
        <v-card>
            <v-container>
            <v-form @submit.prevent="addEvent">
                <v-text-field v-model="title" type="text" label="Event name"></v-text-field>
                <DatePicker v-on:pickDate="pickStartDate($event)"/>
                <DatePicker v-on:pickDate="pickEndDate($event)"/>
                From: <v-time-picker v-model="timeStart"></v-time-picker>
                To: <v-time-picker v-model="timeEnd"></v-time-picker>
                <v-select
                :items="days"
                item-text="dayName"
                item-value="id"
                v-model="daysOfWeek"
                label="Repeat every"
                solo
                ></v-select>
                <v-btn type="submit" color="primary" class="mr-4" @click.stop="dialog = false">
                    Create event
                </v-btn>
            </v-form>
            </v-container>
        </v-card>
        </v-dialog>
  </v-container>
</template>

<script>

import axios from 'axios'
import DatePicker from '@/components/DatePicker'

import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'

export default {
  name: 'Fullcalendar',
  components: {
    FullCalendar,
    DatePicker
  },
  data () {
    return {
      calendarPlugins: [dayGridPlugin, timeGridPlugin],
      header: {
        left: 'today, prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      themeSystem: 'Materia',
      title: '',
      timeStart: null,
      timeEnd: null,
      startRecur: null,
      endRecur: null,
      daysOfWeek: null,
      events: [],
      dialog: false,
      days: [
        {
          id: 0,
          dayName: 'Sunday'
        },
        {
          id: 1,
          dayName: 'Monday'
        },
        {
          id: 2,
          dayName: 'Tuesday'
        },
        {
          id: 3,
          dayName: 'Wednesday'
        },
        {
          id: 4,
          dayName: 'Thursday'
        },
        {
          id: 5,
          dayName: 'Friday'
        },
        {
          id: 6,
          dayName: 'Saturday'
        }
      ]
    }
  },
  methods: {
    async addEvent () {
      try {
        const newEvent = await axios.post('http://localhost:3000/events/add', {
          title: this.title,
          start: this.timeStart,
          end: this.timeEnd,
          startRecurence: this.startRecur,
          endRecurence: this.endRecur,
          daysOfWeek: this.daysOfWeek
        })
        this.events.push(newEvent.data.event)
      } catch (error) {
        console.log(error)
      }
    },
    async getEvents () {
      try {
        const events = await axios.get('http://localhost:3000/events')
        this.events = events.data
      } catch (error) {
        console.log(error)
      }
    },
    eventInfo (arg) {
      console.log(arg.event.extendedProps._id)
    },
    pickStartDate (start) {
      this.startRecur = start
    },
    pickEndDate (end) {
      this.endRecur = end
    }
  },
  mounted () {
    this.getEvents()
  }
}

</script>

<style lang="scss">
@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';
</style>
