<template>
  <v-container>
      <v-btn class="primary" @click="dialog = true">Add event</v-btn>
      <FullCalendar
        defaultView="dayGridMonth"
        :plugins="calendarPlugins"
        :header="header"
        :events="events"
        :themeSystem="themeSystem"
      />
      <v-dialog v-model="dialog" max-width="500">
        <v-card>
            <v-container>
            <v-form @submit.prevent="addEvent">
                <v-text-field v-model="title" type="text" label="Event name"></v-text-field>
                <DatePicker v-on:pickDate="pickStartDate($event)"/>
                <DatePicker v-on:pickDate="pickEndDate($event)"/>
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
      start: '',
      end: '',
      events: [],
      dialog: false
    }
  },
  methods: {
    async addEvent () {
      try {
        const newEvent = await axios.post('http://localhost:3000/events/add', {
          title: this.title,
          start: this.start,
          end: this.end
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
    pickStartDate (start) {
      this.start = start
    },
    pickEndDate (end) {
      this.end = end
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
