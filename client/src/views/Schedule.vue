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
            <div @click="dialogSubject = true" class="mb-6">
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
            <div class="d-flex justify-space-between">
              <div class="d-flex justify-space-between my-2">
                <div>
                  Start time
                  <v-menu
                  ref="timeMenu1"
                  v-model="timeMenu1"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="timeMenu1"
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
                    v-if="timeMenu1"
                    v-model="eventDetails.startTime"
                    full-width
                    @click:minute="$refs.timeMenu1.save(timeMenu1)"
                  ></v-time-picker>
                  </v-menu>
                </div>
              </div>
              <div class="d-flex justify-space-between my-2">
                <div>
                  End time
                  <v-menu
                  ref="timeMenu2"
                  v-model="timeMenu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="timeMenu2"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                  >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                    v-model="eventDetails.endTime"
                    label="Pick time"
                    prepend-icon="access_time"
                    readonly
                    v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="timeMenu2"
                    v-model="eventDetails.endTime"
                    full-width
                    @click:minute="$refs.timeMenu2.save(timeMenu2)"
                  ></v-time-picker>
                  </v-menu>
                </div>
              </div>
            </div>
            <v-text-field label="Room" v-model="eventDetails.room"></v-text-field>
            <v-btn type="submit" v-if="!editMode" color="primary" class="mr-4">
              Create event
            </v-btn>
          </v-form>
          <v-btn v-if="editMode" @click="editEvent" color="primary" class="mr-4">
            Edit event
          </v-btn>
        </v-container>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogRecurring" max-width="500">
      <v-card>
        <v-card-text>
          <v-container>
            <v-form @submit.prevent="addRecurringEvent">
              <v-select
                return-object
                :items="getSubjects"
                label="Select class"
                item-text="name"
                solo
                v-model="eventDetails.selectedClass"
              ></v-select>
              <div>
                <v-icon class="mr-2" @click="dialogSubject = true">add</v-icon><span>Add new class</span>
              </div>
              <v-menu
                ref="dateMenuRec"
                v-model="dateMenuRec"
                :close-on-content-click="false"
                :return-value.sync="dateMenuRec"
                transition="scale-transition"
                offset-y
                min-width="290px"
                >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="eventDetails.startRecur"
                    label="Date"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="eventDetails.startRecur" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="dateMenuRec = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.dateMenuRec.save(dateMenuRec)">OK</v-btn>
                </v-date-picker>
              </v-menu>
              <v-menu
                ref="dateMenuRec2"
                v-model="dateMenuRec2"
                :close-on-content-click="false"
                :return-value.sync="dateMenuRec2"
                transition="scale-transition"
                offset-y
                min-width="290px"
                >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="eventDetails.endRecur"
                    label="Date"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="eventDetails.endRecur" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="dateMenuRec2 = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.dateMenuRec2.save(dateMenuRec2)">OK</v-btn>
                </v-date-picker>
              </v-menu>
              <div class="d-flex justify-space-between">
                <div class="d-flex justify-space-between my-2">
                  <div>
                    Start time
                    <v-menu
                    ref="timeRecurrMenu1"
                    v-model="timeRecurrMenu1"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="timeRecurrMenu1"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                    >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                      v-model="eventDetails.startTimeRecur"
                      label="Pick time"
                      prepend-icon="access_time"
                      readonly
                      v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="timeRecurrMenu1"
                      v-model="eventDetails.startTimeRecur"
                      full-width
                      @click:minute="$refs.timeRecurrMenu1.save(timeRecurrMenu1)"
                    ></v-time-picker>
                    </v-menu>
                  </div>
                </div>
                <div class="d-flex justify-space-between my-2">
                  <div>
                    End time
                    <v-menu
                    ref="timeRecurrMenu2"
                    v-model="timeRecurrMenu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="timeRecurrMenu2"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                    >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                      v-model="eventDetails.endTimeRecur"
                      label="Pick time"
                      prepend-icon="access_time"
                      readonly
                      v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="timeRecurrMenu2"
                      v-model="eventDetails.endTimeRecur"
                      full-width
                      @click:minute="$refs.timeRecurrMenu2.save(timeRecurrMenu2)"
                    ></v-time-picker>
                    </v-menu>
                  </div>
                </div>
              </div>
              <v-select
                :items="daysa"
                item-text="dayName"
                item-value="id"
                v-model="eventDetails.daysOfWeek"
                label="Repeat every"
                solo
              ></v-select>
              <v-text-field label="Room" v-model="eventDetails.room"></v-text-field>
              <v-btn type="submit" color="primary" class="mr-4">
                Create event
              </v-btn>
            </v-form>
              <v-btn @click="editRecurringEvent" color="primary" class="mr-4">
                Edit event
              </v-btn>
          </v-container>
        </v-card-text>
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
              <v-icon class="mr-2">room</v-icon>
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
              <span v-if="event.start">({{ event.start.toString().substr(0, 10) }})</span>
            </td>
            <td v-if="event.start">
              <span> {{ event.start.toString().substr(11,15) }} </span> -
              <span> {{ event.end.toString().substr(11,15) }} </span>
            </td>
            <td v-else>
              <span> {{ event.startTime }} </span> -
              <span> {{ event.endTime }} </span>
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

export default {
  name: 'Schedule',
  components: {
    Breadcrumbs
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
      timeMenu1: false,
      timeMenu2: false,
      timeRecurrMenu1: false,
      timeRecurrMenu2: false,
      timeMenu: false,
      dateMenu: false,
      timeMenuRec: false,
      dateMenuRec: false,
      dateMenuRec2: false,
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
    editSchedule (event) {
      console.log(event)
      if (!event.daysOfWeek) {
        this.dialogSingle = true
        this.editMode = true
        this.eventDetails = {
          eventId: event._id,
          selectedClass: event.subject,
          start: event.start.substr(0, 10),
          room: event.room,
          startTime: event.start.substr(11, 15),
          endTime: event.end.substr(11, 15)
        }
      } else {
        this.dialogRecurring = true
        this.editMode = true
        this.eventDetails = {
          ...event,
          selectedClass: event.subject
        }
      }
    },
    editEvent () {
      this.$store.dispatch('editScheduleEvent', {
        eventId: this.eventDetails.eventId,
        title: this.eventDetails.selectedClass.name,
        start: this.eventDetails.start + `T${this.eventDetails.startTime}`,
        end: this.eventDetails.start + `T${this.eventDetails.endTime}`,
        subject: this.eventDetails.selectedClass._id,
        room: this.eventDetails.room
      }).then(() => {
        this.$store.dispatch('showSnackbar', {
          snackbar: true,
          color: 'success',
          text: 'Schedule edited'
        })
        this.editMode = false
        this.dialogSingle = false
      })
    },
    editRecurringEvent () {
      this.$store.dispatch('editRecurringScheduleEvent', {
        eventId: this.eventDetails._id,
        title: this.eventDetails.selectedClass.name,
        subject: this.eventDetails.selectedClass._id,
        room: this.eventDetails.room,
        daysOfWeek: this.eventDetails.daysOfWeek,
        startRecurence: this.eventDetails.startRecur,
        endRecurence: this.eventDetails.endRecur,
        startTime: this.eventDetails.startTimeRecur,
        endTime: this.eventDetails.endTimeRecur
      }).then(() => {
        this.editMode = false
        this.dialogRecurring = false
      })
    },
    addEvent () {
      this.$store.dispatch('addEvent', {
        title: this.eventDetails.selectedClass.name,
        start: this.eventDetails.start + `T${this.eventDetails.startTime}`,
        end: this.eventDetails.start + `T${this.eventDetails.endTime}`,
        subject: this.eventDetails.selectedClass._id,
        room: this.eventDetails.room,
        daysOfWeek: null
      }).then(() => {
        this.$store.dispatch('showSnackbar', {
          snackbar: true,
          color: 'success',
          text: 'Schedule added'
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
      })
    },
    addRecurringEvent () {
      this.$store.dispatch('addEvent', {
        title: this.eventDetails.selectedClass.name,
        subject: this.eventDetails.selectedClass._id,
        room: this.eventDetails.room,
        daysOfWeek: this.eventDetails.daysOfWeek,
        startRecurence: this.eventDetails.startRecur,
        endRecurence: this.eventDetails.endRecur,
        startTime: this.eventDetails.startTimeRecur,
        endTime: this.eventDetails.endTimeRecur
      }).then(() => {
        this.dialogRecurring = false
      })
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
      this.$store.dispatch('deleteEvent', eventId).then(() => {
        this.$store.dispatch('showSnackbar', {
          snackbar: true,
          color: 'success',
          text: 'Schedule deleted'
        })
      })
    },
    fetchSchedule () {
      this.$store.dispatch('getEvents')
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
        this.editMode = false
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
