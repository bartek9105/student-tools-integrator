<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" class="px-0">
          <div class="d-flex justify-space-between align-center">
            <Breadcrumbs/>
            <v-btn color="primary ml-4" @click="dialogNewExam = true">
              <v-icon class="mr-2">add</v-icon>
              Add exam
            </v-btn>
          </div>
      </v-col>
    </v-row>
    <v-dialog v-model="dialogNewExam" max-width="500">
      <v-card>
        <v-container>
          <v-form @submit.prevent>
            <v-select
              return-object
              :items="getSubjects"
              label="Select class"
              item-text="name"
              item-value="_id"
              solo
              v-model="examDetails.selectedClass"
            ></v-select>
            <v-text-field type="text" label="Room" v-model="examDetails.room"></v-text-field>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="examDetails.start"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="examDetails.start"
                label="Date"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="examDetails.start" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(examDetails.start)">OK</v-btn>
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
                    v-model="examDetails.startTime"
                    label="Pick time"
                    prepend-icon="access_time"
                    readonly
                    v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="timeMenu1"
                    v-model="examDetails.startTime"
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
                    v-model="examDetails.endTime"
                    label="Pick time"
                    prepend-icon="access_time"
                    readonly
                    v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="timeMenu2"
                    v-model="examDetails.endTime"
                    full-width
                    @click:minute="$refs.timeMenu2.save(timeMenu2)"
                  ></v-time-picker>
                  </v-menu>
                </div>
              </div>
            </div>
            <ColorPicker v-if="colorPicker" v-on:changeColor="changeColor($event)"/>
            <div class="d-flex justify-space-between align-center">
              <v-btn type="submit" v-if="!editMode" color="primary" class="mr-4" @click="addExam" @click.stop="dialogTask = false">
                Add exam
              </v-btn>
              <v-icon @click="colorPicker = !colorPicker">palette</v-icon>
            </div>
          </v-form>
          <v-btn v-if="editMode" color="primary" @click="editExam(examDetails)">Edit exam</v-btn>
        </v-container>
      </v-card>
    </v-dialog>
    <p v-if="getExams.length == 0" class="text-center display-1 gray--text">No scheduled class added</p>
    <v-simple-table v-else class="elevation-1">
      <template v-slot:default>
        <thead>
          <tr class="pl-8">
            <th class="text-left">
              <v-icon class="mr-2">class</v-icon>
              Class
            </th>
            <th class="text-left">
              <v-icon class="mr-2">calendar_today</v-icon>
              Date
            </th>
            <th class="text-left">
              <v-icon class="mr-2">schedule</v-icon>
              Time
            </th>
            <th class="text-left">
              <v-icon class="mr-2">person</v-icon>
              Teacher
            </th>
            <th class="text-left">
              <v-icon class="mr-2">room</v-icon>
              Room
            </th>
            <th class="text-left">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="exam in getExams" :key="exam._id">
            <td class="border" :style="{'border-left-color': exam.color}">
              <router-link :to="'/subject/' + exam.subject._id">
                {{ exam.subject.name }}
              </router-link>
            </td>
            <td>{{ exam.start.substr(0, 10) }}</td>
            <td>{{ exam.start.substr(11, 15) }} - {{ exam.end.substr(11, 15) }}</td>
            <td>{{ exam.subject.teacher }}</td>
            <td>{{ exam.room }}</td>
            <td>
              <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">more_vert</v-icon>
                </template>
                <v-list>
                  <v-list-item>
                    <v-list-item-title class="body-2" @click="updateEditDialog(exam)">
                      <v-icon class="mr-2">create</v-icon> Edit
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title class="body-2" @click="deleteExam(exam._id)">
                      <v-icon class="mr-2">delete</v-icon> Delete
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
import ColorPicker from '@/components/ColorPicker'

export default {
  name: 'Exams',
  components: {
    Breadcrumbs,
    ColorPicker
  },
  data () {
    return {
      dialogNewExam: false,
      timeMenu1: false,
      timeMenu2: false,
      examDetails: {
        examId: null,
        color: '',
        title: null,
        exam: null,
        selectedClass: '',
        startTime: null,
        endTime: null,
        room: '',
        subject: null,
        start: null
      },
      menu: false,
      colorPicker: false,
      editMode: false
    }
  },
  methods: {
    addExam () {
      if (this.examDetails.selectedClass !== null && this.examDetails.start !== null && this.examDetails.startTime !== null && this.examDetails.endTime !== null) {
        this.$store.dispatch('addEvent', {
          title: this.examDetails.selectedClass.name + ' exam',
          start: this.examDetails.start + `T${this.examDetails.startTime}`,
          end: this.examDetails.start + `T${this.examDetails.endTime}`,
          daysOfWeek: null,
          subject: this.examDetails.selectedClass._id,
          room: this.examDetails.room,
          color: this.examDetails.color,
          exam: true
        }).then(() => {
          this.examDetails.selectedClass = null
          this.examDetails.start = null
          this.examDetails.startTime = null
          this.examDetails.endTime = null
          this.examDetails.room = null
          this.examDetails.color = null
          this.dialogNewExam = false
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
          text: 'Subject and data fields cannot be empty'
        })
      }
    },
    editExam (exam) {
      this.$store.dispatch('editExamEvent', exam).then(() => {
        this.editMode = false
        this.dialogNewExam = false
        this.examDetails.selectedClass = null
        this.examDetails.start = null
        this.examDetails.startTime = null
        this.examDetails.endTime = null
        this.examDetails.room = null
        this.examDetails.color = null
        this.$store.dispatch('showSnackbar', {
          snackbar: true,
          color: 'success',
          text: 'Exam edited'
        })
      })
    },
    fetchExams () {
      this.$store.dispatch('getEvents')
    },
    updateEditDialog (exam) {
      this.examDetails.examId = exam._id
      this.examDetails.title = exam.title
      this.examDetails.room = exam.room
      this.examDetails.selectedClass = exam.subject
      this.examDetails.exam = true
      this.examDetails.start = exam.start.substr(0, 10)
      this.examDetails.end = exam.end.substr(0, 10)
      this.examDetails.startTime = exam.start.substr(11, 15)
      this.examDetails.endTime = exam.end.substr(11, 15)
      this.examDetails.color = exam.color
      this.dialogNewExam = true
      this.editMode = true
    },
    deleteExam (examId) {
      this.$store.dispatch('deleteEvent', examId).then(() => {
        this.$store.dispatch('showSnackbar', {
          snackbar: true,
          color: 'success',
          text: 'Exam deleted'
        })
      })
    },
    changeColor (color) {
      this.examDetails.color = color
    }
  },
  computed: {
    getSubjects () {
      return this.$store.getters.getSubjects
    },
    getExams () {
      return this.$store.getters.eventsGetter.filter(el => el.exam)
    }
  },
  mounted () {
    this.fetchExams()
  }
}
</script>

<style scoped>
  tr {
    height: 70px;
  }
  .border {
    border-left: 3px solid;
  }
</style>
