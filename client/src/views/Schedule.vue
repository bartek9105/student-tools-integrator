<template>
  <v-container>
    <div class="d-flex justify-space-between align-center mb-4">
      <Breadcrumbs/>
      <div>
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-btn class="mx-2" fab small dark color="primary" v-on="on" @click="dialogRecurring = true">
              <v-icon dark>control_point_duplicate</v-icon>
            </v-btn>
          </template>
          <span>Add new recurring event</span>
        </v-tooltip>
        <AddButton @click="dialogSingle = true">Add new event</AddButton>
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
            <DatePicker :date="eventDetails.start" v-on:pickDate="pickStartDate($event)"/>
            <div class="d-flex justify-space-between">
              <TimePicker :initTime="eventDetails.startTimeSingle" v-on:pickTime="pickStartTimeSingle($event)"/>
              <TimePicker :initTime="eventDetails.endTimeSingle" v-on:pickTime="pickEndTimeSingle($event)"/>
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
            <DatePicker :initDate="eventDetails.startRecur" v-on:pickDate="pickStartRecurDate($event)"/>
            <DatePicker :initDate="eventDetails.endRecur" v-on:pickDate="pickEndRecurDate($event)"/>
            <div class="d-flex justify-space-between">
              <div class="d-flex justify-space-between my-2">
                <TimePicker :initTime="eventDetails.startTime" v-on:pickTime="pickStartRecurTime($event)"/>
              </div>
              <div class="d-flex justify-space-between my-2">
                <TimePicker :initTime="eventDetails.endTime" v-on:pickTime="pickEndRecurTime($event)"/>
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
            <v-btn type="submit" v-if="!editMode" color="primary" class="mr-4">
              Create event
            </v-btn>
          </v-form>
            <v-btn v-if="editMode" @click="editRecurringEvent" color="primary" class="mr-4">
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
    <p v-if="getSchedule.length == 0" class="text-center display-1 gray--text">No scheduled class added</p>
    <v-simple-table v-else class="elevation-1">
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
            <td class="mobile-row">
              <router-link :to="'subject/' + event.subject._id"> {{ event.title }} </router-link>
              <div class="responsive-crud-menu">
                <v-menu offset-y>
                  <template v-slot:activator="{ on }">
                    <v-icon color="primary" dark v-on="on">
                      more_vert
                    </v-icon>
                  </template>
                  <v-list>
                    <v-list-item>
                      <v-list-item-title @click="editSchedule(event)">
                        <v-btn text>
                          <v-icon class="mr-2">create</v-icon> Edit
                        </v-btn>
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title @click="deleteScheduleElement(event._id)">
                        <v-btn text>
                          <v-icon class="mr-2">delete</v-icon> Delete
                        </v-btn>
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </td>
            <td v-if="event.daysOfWeek">
              <span class="font-weight-medium mr-2">Every {{ days[event.daysOfWeek] }}</span> &nbsp; ({{ event.startRecur}} - {{ event.endRecur }})
            </td>
            <td v-else>
              <span class="font-weight-medium mr-2">{{ days[new Date(event.start).getDay()] }} </span>
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
            <td class="crud-menu">
              <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <v-icon color="primary" dark v-on="on">
                    more_vert
                  </v-icon>
                </template>
                <v-list>
                  <v-list-item>
                    <v-list-item-title @click="editSchedule(event)">
                      <v-btn text>
                        <v-icon class="mr-2">create</v-icon> Edit
                      </v-btn>
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title @click="deleteScheduleElement(event._id)">
                      <v-btn text>
                        <v-icon class="mr-2">delete</v-icon> Delete
                      </v-btn>
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
import AddButton from '@/components/AddButton'
import DatePicker from '@/components/DatePicker'
import TimePicker from '@/components/TimePicker'

export default {
  name: 'Schedule',
  components: {
    Breadcrumbs,
    AddButton,
    DatePicker,
    TimePicker
  },
  data () {
    return {
      dialogSingle: false,
      dialogRecurring: false,
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
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
      dialogSubject: false,
      subjectName: null,
      eventDetails: {
        title: null,
        start: null,
        startTimeSingle: null,
        endTimeSingle: null,
        startTime: null,
        endTime: null,
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
    pickStartRecurTime (time) {
      this.eventDetails.startTime = time
    },
    pickEndRecurTime (time) {
      this.eventDetails.endTime = time
    },
    pickStartRecurDate (date) {
      this.eventDetails.startRecur = date
    },
    pickEndRecurDate (date) {
      this.eventDetails.endRecur = date
    },
    pickStartDate (date) {
      this.eventDetails.start = date
    },
    pickStartTimeSingle (startTimeSingle) {
      this.eventDetails.startTimeSingle = startTimeSingle
    },
    pickEndTimeSingle (endTimeSingle) {
      this.eventDetails.endTimeSingle = endTimeSingle
    },
    editSchedule (event) {
      if (!event.daysOfWeek) {
        this.dialogSingle = true
        this.editMode = true
        this.eventDetails = {
          eventId: event._id,
          selectedClass: event.subject,
          start: event.start.substr(0, 10),
          room: event.room,
          startTimeSingle: event.start.substr(11, 15),
          endTimeSingle: event.end.substr(11, 15),
          startTime: event.startTime,
          endTime: event.endTime
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
        start: this.eventDetails.start + `T${this.eventDetails.startTimeSingle}`,
        end: this.eventDetails.start + `T${this.eventDetails.endTimeSingle}`,
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
        startTime: this.eventDetails.startTime,
        endTime: this.eventDetails.endTime
      }).then(() => {
        this.editMode = false
        this.dialogRecurring = false
      })
    },
    addEvent () {
      if (this.eventDetails.selectedClass !== null && this.eventDetails.start !== null && this.eventDetails.end !== null && this.eventDetails.startTimeSingle !== null && this.eventDetails.endTimeSingle !== null) {
        this.$store.dispatch('addEvent', {
          title: this.eventDetails.selectedClass.name,
          start: this.eventDetails.start + `T${this.eventDetails.startTimeSingle}`,
          end: this.eventDetails.start + `T${this.eventDetails.endTimeSingle}`,
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
        })
      } else {
        this.$store.dispatch('showSnackbar', {
          snackbar: true,
          color: 'error',
          text: 'Pick class and date'
        })
      }
    },
    addRecurringEvent () {
      if (this.eventDetails.selectedClass !== null && this.eventDetails.daysOfWeek !== null && this.eventDetails.startRecur !== null && this.eventDetails.endRecur !== null && this.eventDetails.startTime !== null && this.eventDetails.endTime !== null) {
        this.$store.dispatch('addEvent', {
          title: this.eventDetails.selectedClass.name,
          subject: this.eventDetails.selectedClass._id,
          room: this.eventDetails.room,
          daysOfWeek: this.eventDetails.daysOfWeek,
          startRecurence: this.eventDetails.startRecur,
          endRecurence: this.eventDetails.endRecur,
          startTime: this.eventDetails.startTime,
          endTime: this.eventDetails.endTime
        }).then(() => {
          this.dialogRecurring = false
          this.$store.dispatch('showSnackbar', {
            snackbar: true,
            color: 'success',
            text: 'New recurring schedule added'
          })
        })
      } else {
        this.$store.dispatch('showSnackbar', {
          snackbar: true,
          color: 'error',
          text: 'Pick class and date'
        })
      }
    },
    addSubject () {
      if (this.subjectName !== null) {
        this.$store.dispatch('addSubject', {
          name: this.subjectName
        }).then(() => {
          this.$store.dispatch('showSnackbar', {
            snackbar: true,
            color: 'success',
            text: 'New class scheduled'
          })
        })
      } else {
        this.$store.dispatch('showSnackbar', {
          snackbar: true,
          color: 'error',
          text: 'Subject name cannot be empty'
        })
      }
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
          title: null,
          start: null,
          startTime: null,
          endTime: null,
          startTimeSingle: null,
          endTimeSingle: null,
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
    },
    dialogRecurring (val) {
      if (!val) {
        this.eventDetails = {
          title: null,
          start: null,
          startTime: null,
          endTime: null,
          startTimeSingle: null,
          endTimeSingle: null,
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
  .responsive-crud-menu {
    display: none;
  }
  td:not(:first-child) {
    padding-top: 25px;
    padding-bottom: 25px;
  }
  .table-header {
    padding-top: 25px !important;
    padding-bottom: 25px !important;
  }
  @media screen and (max-width: 768px) {
    .mobile-row {
      display: flex;
      justify-content: space-between;
    }
    .crud-menu {
      display: none;
    }
    .responsive-crud-menu {
      display: block;
    }
    td:not(:first-child) {
      padding-top: 0;
      padding-bottom: 0;
    }
    .v-data-table table {
      display: flex;
    }
    tr {
      display: flex;
      flex-direction: column
    }
    td:not(:last-child) {
      border-bottom: none !important;
    }
    td {
      display: flex;
      align-items: center;
    }
    thead {
      display: none;
    }
  }
</style>
