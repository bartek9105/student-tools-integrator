<template>
  <v-container>
    <div class="d-flex justify-space-between align-center">
      <Breadcrumbs/>
      <v-btn class="primary" @click="dialog = true">Add event</v-btn>
    </div>
    <FullCalendar
      defaultView="dayGridMonth"
      :plugins="calendarPlugins"
      :header="header"
      :events="events"
      :eventColor="eventColor"
      :eventTextColor="eventTextColor"
      :height="700"
      @eventClick="eventInfo"
    />
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <template>
        <v-card>
          <v-toolbar flat color="primary" dark>
            <v-icon class="mr-4" @click="dialog = false">close</v-icon>
            <v-toolbar-title>Create new event</v-toolbar-title>
          </v-toolbar>
          <v-tabs>
            <v-tab>
              Create event
            </v-tab>
            <v-tab>
              Create recurring event
            </v-tab>
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <v-container>
                    <v-form @submit.prevent="addEvent">
                      <v-text-field v-model="eventDetails.title" type="text" label="Event name"></v-text-field>
                      <v-text-field v-model="eventDetails.details" type="text" label="Event details (optional)"></v-text-field>
                      <DatePicker v-on:pickDate="pickStart($event)"/>
                      <DatePicker v-on:pickDate="pickEnd($event)"/>
                      <div class="d-flex justify-space-between my-2">
                        <div>
                          Start time
                          <TimePicker v-on:pickTime="pickStartTime($event)"/>
                        </div>
                        <div>
                          End time
                          <TimePicker v-on:pickTime="pickEndTime($event)"/>
                        </div>
                      </div>
                      <v-btn type="submit" color="primary" class="mr-4">
                        Create event
                      </v-btn>
                    </v-form>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <v-container>
                    <v-form @submit.prevent="addEvent">
                      <v-text-field v-model="eventDetails.title" type="text" label="Event name"></v-text-field>
                      <DatePicker v-on:pickDate="pickStartDate($event)"/>
                      <DatePicker v-on:pickDate="pickEndDate($event)"/>
                      <div class="d-flex justify-space-between my-2">
                        <div>
                          Start time
                          <TimePicker v-on:pickTime="pickStartTime($event)"/>
                        </div>
                        <div>
                          End time
                          <TimePicker v-on:pickTime="pickEndTime($event)"/>
                        </div>
                      </div>
                      <v-select
                        :items="days"
                        item-text="dayName"
                        item-value="id"
                        v-model="eventDetails.daysOfWeek"
                        label="Repeat every"
                        solo
                      ></v-select>
                      <v-btn type="submit" color="primary" class="mr-4">
                        Create event
                      </v-btn>
                    </v-form>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </template>
    </v-dialog>
    <!-- Event dialog -->
    <div class="text-center">
      <v-dialog
        v-model="eventDialog"
        width="500"
        @input="v=>v||cleanCurrentEvent()"
      >
      <v-card v-if="currentEvent">
        <v-card-title
          class="headline primary"
        >
        <p class="white--text">{{ currentEvent.title }}</p>
        </v-card-title>

        <v-card-text class="pt-6">
          <div class="d-flex align-center">
            <v-icon class="mr-4">date_range</v-icon>
            <p class="mb-0 subtitle-1">
              <span class="font-weight-bold">From: </span> {{ currentEvent.start.substr(0, 10) }}
              <span class="font-weight-bold">To: </span> {{ currentEvent.end.substr(0, 10) }}
            </p>
          </div>
          <div class="d-flex align-center mt-4">
            <v-icon class="mr-4">description</v-icon>
            <p class="mb-0 subtitle-1">{{ currentEvent.details }}</p>
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary">Edit</v-btn>
          <v-btn color="primary">Delete</v-btn>
        </v-card-actions>
      </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>

<script>

import axios from 'axios'

import DatePicker from '@/components/DatePicker'
import TimePicker from '@/components/TimePicker'
import Breadcrumbs from '@/components/Breadcrumbs'

import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'

export default {
  name: 'Calendar',
  components: {
    FullCalendar,
    DatePicker,
    TimePicker,
    Breadcrumbs
  },
  data () {
    return {
      calendarPlugins: [dayGridPlugin, timeGridPlugin],
      header: {
        left: 'today, prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      eventDetails: {
        title: '',
        start: null,
        end: null,
        startTime: null,
        endTime: null,
        startRecur: null,
        endRecur: null,
        daysOfWeek: null,
        details: null
      },
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
      ],
      eventColor: '',
      eventTextColor: '#fff',
      menuStartTime: false,
      menuEndTime: false,
      eventDialog: false,
      currentEvent: null
    }
  },
  methods: {
    async addEvent () {
      try {
        const newEvent = await axios.post('http://localhost:3000/events/add', {
          title: this.eventDetails.title,
          start: this.eventDetails.start,
          end: this.eventDetails.end,
          startTime: this.eventDetails.startTime,
          endTime: this.eventDetails.endTime,
          startRecurence: this.eventDetails.startRecur,
          endRecurence: this.eventDetails.endRecur,
          daysOfWeek: this.eventDetails.daysOfWeek,
          details: this.eventDetails.details
        })
        this.events.push(newEvent.data.event)
        this.dialog = false
        this.eventDetails = {
          title: '',
          start: null,
          end: null,
          startTime: null,
          endTime: null,
          startRecur: null,
          endRecur: null,
          daysOfWeek: null,
          details: null
        }
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
      this.eventDialog = true
      this.currentEvent = {
        title: arg.event.title,
        start: arg.event.start.toString(),
        end: arg.event.end.toString(),
        details: arg.event.extendedProps.details.toString()
      }
    },
    pickStartDate (start) {
      this.eventDetails.startRecur = start
    },
    pickEndDate (end) {
      this.eventDetails.endRecur = end
    },
    pickStart (start) {
      this.eventDetails.start = start
    },
    pickEnd (end) {
      this.eventDetails.end = end
    },
    pickStartTime (startTime) {
      this.eventDetails.startTime = startTime
    },
    pickEndTime (endTime) {
      this.eventDetails.endTime = endTime
    },
    changeColor (color) {
      this.eventColor = color
    },
    cleanCurrentEvent () {
      this.currentEvent = null
    }
  },
  computed: {
    shortenDate (date) {
      return date.substr(0, 10)
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
