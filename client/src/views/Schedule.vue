<template>
  <v-container>
    <div class="d-flex justify-space-between align-center mb-4">
      <Breadcrumbs/>
      <div>
        <v-btn class="primary mr-2" @click="dialogSingle = true">Add</v-btn>
        <v-btn class="primary" @click="dialogRecurring = true">Add Recurring</v-btn>
      </div>
    </div>
    <v-dialog v-model="dialogSingle" max-width="500">
      <v-card>
        <v-container>
          <v-form @submit.prevent="addEvent">
            <v-select
              return-object
              :items="getSubjects"
              label="Select class"
              item-text="name"
              solo
              v-model="eventDetails.selectedClass"
            ></v-select>
            <div @click="dialogSubject = true">
              <v-icon class="mr-2">add</v-icon><span>Add new class</span>
            </div>
            <v-menu
              ref="dateMenu"
              v-model="dateMenu"
              :close-on-content-click="false"
              :return-value.sync="dateMenu"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="eventDetails.start"
                label="Date"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="eventDetails.start" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="dateMenu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.dateMenu.save(dateMenu)">OK</v-btn>
            </v-date-picker>
            </v-menu>
            <div class="d-flex justify-space-between my-2">
              <div>
                Start time
                <v-menu
                ref="timeMenu"
                v-model="timeMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="timeMenu"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
                >
                <template v-slot:activator="{ on }">
                    <v-text-field
                    v-model="eventDetails.startTime"
                    label="Pick time"
                    prepend-icon="access_time"
                    readonly
                    v-on="on"
                    ></v-text-field>
                </template>
                <v-time-picker
                    v-if="timeMenu"
                    v-model="eventDetails.startTime"
                    full-width
                    @click:minute="$refs.timeMenu.save(timeMenu)"
                ></v-time-picker>
                </v-menu>
              </div>
              <div>
                End time
                <TimePicker v-on:pickTime="pickEndTime($event)"/>
              </div>
            </div>
            <v-text-field label="Room" v-model="eventDetails.room"></v-text-field>
            <v-btn type="submit" color="primary" class="mr-4">
              Create event
            </v-btn>
          </v-form>
          <v-btn v-if="editMode" @click="editEvent" color="primary" class="mr-4">
            Edit event
          </v-btn>
        </v-container>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogSubject" max-width="500">
      <v-card>
        <v-container>
          <v-form @submit.prevent>
            <v-text-field type="text" label="Subject name" v-model="subjectName"></v-text-field>
            <v-btn type="submit" color="primary" class="mr-4" @click="addSubject" @click.stop="dialogSubject = false">
              Create subject
            </v-btn>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
    <v-simple-table class="elevation-1">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left table-header font-weight-black">
              <v-icon class="mr-2">class</v-icon>
              Class
            </th>
            <th class="text-left table-header font-weight-black">
              <v-icon class="mr-2">calendar_today</v-icon>
              Day
            </th>
            <th class="text-left table-header font-weight-black">
              <v-icon class="mr-2">schedule</v-icon>
              Time
            </th>
            <th class="text-left table-header font-weight-black">
              <v-icon class="mr-2">person</v-icon>
              Teacher
            </th>
            <th class="text-left table-header font-weight-black">
              <v-icon class="mr-2">person</v-icon>
              Room
            </th>
            <th class="text-left table-header font-weight-black">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in getSchedule" :key="event._id">
            <td>
              <router-link :to="'subject/' + event.subject._id"> {{ event.title }} </router-link>
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
            <td>
              {{ event.subject.teacher }}
            </td>
            <td>
              {{ event.room }}
            </td>
            <td>
              <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <v-icon color="primary" dark v-on="on">
                    more_vert
                  </v-icon>
                </template>
                <v-list>
                  <v-list-item>
                    <v-list-item-title>
                      <v-btn text @click="editSchedule(event)">Edit</v-btn>
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>
                      <v-btn text @click="deleteScheduleElement(event._id)">Delete</v-btn>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>

import Breadcrumbs from '@/components/Breadcrumbs'
import TimePicker from '@/components/TimePicker'

export default {
  name: 'Schedule',
  components: {
    Breadcrumbs,
    TimePicker
  },
  data () {
    return {
      dialogSingle: false,
      dialogRecurring: false,
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      daysa: [
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
      timeMenu: false,
      dateMenu: false,
      dialogSubject: false,
      subjectName: null,
      eventDetails: {
        title: '',
        start: null,
        startTime: null,
        endTime: null,
        startTimeRecur: null,
        endTimeRecur: null,
        startRecur: null,
        endRecur: null,
        daysOfWeek: null,
        selectedClass: null,
        room: null
      },
      editMode: false
    }
  },
  methods: {
    closeDialog () {
      this.dialogSingle = false
      console.log('eee')
      this.eventDetails = {
        title: '',
        start: null,
        startTime: null,
        endTime: null,
        startRecur: null,
        endRecur: null,
        daysOfWeek: null,
        room: null
      }
      this.editMode = false
    },
    editSchedule (event) {
      this.dialogSingle = true
      this.editMode = true
      this.eventDetails = {
        eventId: event._id,
        selectedClass: event.subject,
        start: event.start.substr(0, 10),
        room: event.room,
        startTime: event.start.substr(11, 15)
      }
    },
    editEvent () {
      this.$store.dispatch('editScheduleEvent', {
        eventId: this.eventDetails.eventId,
        title: this.eventDetails.selectedClass.name,
        start: this.eventDetails.start + `T${this.eventDetails.startTime}`,
        subject: this.eventDetails.selectedClass._id,
        room: this.eventDetails.room
      }).then(() => {
        this.editMode = false
        this.dialogSingle = false
      })
    },
    addEvent () {
      this.$store.dispatch('addEvent', {
        title: this.eventDetails.selectedClass.name,
        start: this.eventDetails.start + `T${this.eventDetails.startTime}`,
        subject: this.eventDetails.selectedClass._id,
        room: this.eventDetails.room,
        daysOfWeek: null
      })
      this.dialogSingle = false
      this.eventDetails = {
        title: '',
        start: null,
        startTime: null,
        endTime: null,
        startRecur: null,
        endRecur: null,
        daysOfWeek: null,
        room: null
      }
    },
    addSubject () {
      this.$store.dispatch('addSubject', {
        name: this.subjectName
      }).then(() => {
        this.$store.dispatch('showSnackbar', {
          snackbar: true,
          color: 'success',
          text: 'New class scheduled'
        })
      })
    },
    deleteScheduleElement (eventId) {
      this.$store.dispatch('deleteEvent', eventId)
    },
    fetchSchedule () {
      this.$store.dispatch('getEvents')
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
    pickStartTime (startTime) {
      this.eventDetails.startTime = startTime
    },
    pickEndTime (endTime) {
      this.eventDetails.endTime = endTime
    },
    pickStartTimeRecur (startTime) {
      this.eventDetails.startTimeRecur = startTime
    },
    pickEndTimeRecur (endTime) {
      this.eventDetails.endTimeRecur = endTime
    }
  },
  computed: {
    getSchedule () {
      return this.$store.getters.eventsGetter.filter(el => el.subject && !el.exam)
    },
    getSubjects () {
      return this.$store.getters.getSubjects
    }
  },
  watch: {
    dialogSingle (val) {
      if (!val) {
        this.eventDetails = {
          title: '',
          start: null,
          startTime: null,
          endTime: null,
          startTimeRecur: null,
          endTimeRecur: null,
          startRecur: null,
          endRecur: null,
          daysOfWeek: null,
          selectedClass: null,
          room: null
        }
      }
    }
  },
  mounted () {
    this.fetchSchedule()
  }
}
</script>

<style scoped>
  td:not(:first-child) {
    padding-top: 25px;
    padding-bottom: 25px;
  }
  .table-header {
    padding-top: 25px !important;
    padding-bottom: 25px !important;
  }
</style>
