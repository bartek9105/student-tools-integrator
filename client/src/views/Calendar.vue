<template>
  <v-container>
     <v-row class="fill-height">
        <v-col>
          <v-sheet height="64">
            <v-toolbar flat color="white">
              <v-btn class="mr-4" dark color="primary" @click="dialog = true">
                Add Event
              </v-btn>
              <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
                Today
              </v-btn>
              <v-btn fab text small color="grey darken-2" @click="prev">
                <v-icon small>mdi-chevron-left</v-icon>
              </v-btn>
              <v-btn fab text small color="grey darken-2" @click="next">
                <v-icon small>mdi-chevron-right</v-icon>
              </v-btn>
              <v-toolbar-title>{{ title }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-menu bottom right>
                <template v-slot:activator="{ on }">
                  <v-btn
                    outlined
                    color="grey darken-2"
                    v-on="on"
                  >
                    <span>{{ typeToLabel[type] }}</span>
                    <v-icon right>mdi-menu-down</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="type = 'day'">
                    <v-list-item-title>Day</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = 'week'">
                    <v-list-item-title>Week</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = 'month'">
                    <v-list-item-title>Month</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = '4day'">
                    <v-list-item-title>4 days</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-toolbar>
          </v-sheet>

          <v-dialog v-model="dialog" max-width="500">
            <v-card>
              <v-container>
                <v-form @submit.prevent="addEvent">
                  <v-text-field v-model="name" type="text" label="Event name"></v-text-field>
                  <v-text-field v-model="details" type="text" label="Event details"></v-text-field>
                  <v-text-field v-model="start" type="date" label="Start date"></v-text-field>
                  <v-text-field v-model="end" type="date" label="End date"></v-text-field>
                  <v-text-field v-model="color" type="color" label="Pick color"></v-text-field>
                  <v-btn type="submit" color="primary" class="mr-4" @click.stop="dialog = false">
                    Create event
                  </v-btn>
                </v-form>
              </v-container>
            </v-card>
          </v-dialog>

          <v-sheet height="600">
            <v-calendar
              ref="calendar"
              v-model="focus"
              color="primary"
              :events="events"
              :event-color="getEventColor"
              :now="today"
              :type="type"
              @click:event="showEvent"
              @click:more="viewDay"
              @click:date="viewDay"
              @change="updateRange"
            ></v-calendar>
            <v-menu
              v-model="selectedOpen"
              :close-on-content-click="false"
              :activator="selectedElement"
              offset-x
            >
              <v-card
                color="grey lighten-4"
                min-width="350px"
                flat
              >
                <v-toolbar
                  :color="selectedEvent.color"
                  dark
                >

                  <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon @click="deleteEvent(selectedEvent._id)">mdi-delete</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-card-text>
                  <form v-if="editing !== selectedEvent._id">
                    {{ selectedEvent.details }}
                  </form>
                  <form v-else>
                    <textarea v-model="selectedEvent.details" type="text" style="width: 100%" placeholder="Add note"></textarea>
                  </form>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    text
                    color="secondary"
                    @click="selectedOpen = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn text v-if="editing !== selectedEvent._id" @click.prevent="editEvent(selectedEvent)">Edit</v-btn>
                  <v-btn text v-else @click="updateEvent(selectedEvent)">Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </v-sheet>
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Calendar',
  data () {
    return {
      today: new Date().toISOString().substr(0, 10),
      focus: new Date().toISOString().substr(0, 10),
      type: 'month',
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
        '4day': '4 Days'
      },
      name: null,
      details: null,
      start: null,
      end: null,
      color: '#1976D2',
      editing: null,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      dialog: false
    }
  },
  methods: {
    getEvents () {
      this.$store.dispatch('getEvents').then(() => {
        this.events = this.$store.getters.eventsGetter
      })
    },
    async addEvent () {
      try {
        if (this.name && this.start && this.end) {
          await axios.post('http://localhost:3000/events/add', {
            name: this.name,
            details: this.details,
            start: this.start,
            end: this.end,
            color: this.color
          })
          this.$store.dispatch('showSnackbar', {
            snackbar: true,
            color: 'success',
            text: 'Event added'
          })
        }
      } catch (error) {
        console.log(error)
        this.$store.dispatch('showSnackbar', {
          snackbar: true,
          color: 'error',
          text: error
        })
      }
      this.getEvents()
      this.name = ''
      this.details = ''
      this.start = ''
      this.end = ''
      this.color = '#1976D2'
    },
    async editEvent (ev) {
      this.editing = ev._id
    },
    async updateEvent (ev) {
      try {
        await axios.patch(`http://localhost:3000/events/edit/${ev._id}`, {
          details: ev.details
        })
        this.$store.dispatch('showSnackbar', {
          snackbar: true,
          color: 'success',
          text: 'Event updated'
        })
      } catch (error) {
        console.log(error)
        this.$store.dispatch('showSnackbar', {
          snackbar: true,
          color: 'error',
          text: error
        })
      }
      this.selectedOpen = false
      this.editing = null
    },
    async deleteEvent (id) {
      try {
        await axios.delete(`http://localhost:3000/events/delete/${id}`)
        this.$store.dispatch('showSnackbar', {
          snackbar: true,
          color: 'success',
          text: 'Event deleted'
        })
      } catch (error) {
        console.log(error)
        this.$store.dispatch('showSnackbar', {
          snackbar: true,
          color: 'error',
          text: error
        })
      }
      this.selectedOpen = false
      this.getEvents()
    },
    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.focus = this.today
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => (this.selectedOpen = true), 10)
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    updateRange ({ start, end }) {
      this.start = start
      this.end = end
    },
    nth (d) {
      return d > 3 && d < 21
        ? 'th'
        : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
    }
  },
  computed: {
    title () {
      const { start, end } = this
      if (!start || !end) {
        return ''
      }

      const startMonth = this.monthFormatter(start)
      const endMonth = this.monthFormatter(end)
      const suffixMonth = startMonth === endMonth ? '' : endMonth

      const startYear = start.year
      const endYear = end.year
      const suffixYear = startYear === endYear ? '' : endYear

      const startDay = start.day + this.nth(start.day)
      const endDay = end.day + this.nth(end.day)

      switch (this.type) {
        case 'month':
          return `${startMonth} ${startYear}`
        case 'week':
        case '4day':
          return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`
        case 'day':
          return `${startMonth} ${startDay} ${startYear}`
      }
      return ''
    },
    monthFormatter () {
      return this.$refs.calendar.getFormatter({
        timeZone: 'UTC', month: 'long'
      })
    }
  },
  mounted () {
    this.getEvents()
    this.$refs.calendar.checkChange()
  }
}
</script>

<style>

</style>
