<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" class="px-0">
          <div class="d-flex justify-space-between align-center">
            <Breadcrumbs/>
            <AddButton @click="dialogNewExam = true">Add new exam</AddButton>
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
            <DatePicker :initDate="examDetails.start" v-on:pickDate="pickStartDate($event)"/>
            <div class="d-flex justify-space-between">
              <div class="d-flex justify-space-between my-2">
                <TimePicker :initTime="examDetails.startTime" v-on:pickTime="pickStartTime($event)"/>
              </div>
              <div class="d-flex justify-space-between my-2">
                <TimePicker :initTime="examDetails.endTime" v-on:pickTime="pickEndTime($event)"/>
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
    <p v-if="getExams.length == 0" class="text-center display-1 gray--text">No scheduled exams</p>
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
            <td class="border mobile-row" :style="{'border-left-color': exam.color}">
              <router-link :to="'/subject/' + exam.subject._id">
                {{ exam.subject.name }}
              </router-link>
              <div class="responsive-crud-menu">
                <v-menu offset-y>
                  <template v-slot:activator="{ on }">
                    <v-icon v-on="on">more_vert</v-icon>
                  </template>
                  <v-list>
                    <v-list-item>
                      <v-list-item-title class="body-2" @click="updateEditDialog(exam)">
                        <v-btn text>
                          <v-icon class="mr-2">create</v-icon> Edit
                        </v-btn>
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title class="body-2" @click="deleteExam(exam._id)">
                        <v-btn text>
                          <v-icon class="mr-2">delete</v-icon> Delete
                        </v-btn>
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </td>
            <td>{{ exam.start.substr(0, 10) }}</td>
            <td>{{ exam.start.substr(11, 15) }} - {{ exam.end.substr(11, 15) }}</td>
            <td>{{ exam.subject.teacher }}</td>
            <td>{{ exam.room }}</td>
            <td class="crud-menu">
              <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">more_vert</v-icon>
                </template>
                <v-list>
                  <v-list-item>
                    <v-list-item-title class="body-2" @click="updateEditDialog(exam)">
                      <v-btn text>
                        <v-icon class="mr-2">create</v-icon> Edit
                      </v-btn>
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title class="body-2" @click="deleteExam(exam._id)">
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
import ColorPicker from '@/components/ColorPicker'
import AddButton from '@/components/AddButton'
import DatePicker from '@/components/DatePicker'
import TimePicker from '@/components/TimePicker'

export default {
  name: 'Exams',
  components: {
    Breadcrumbs,
    ColorPicker,
    AddButton,
    DatePicker,
    TimePicker
  },
  data () {
    return {
      dialogNewExam: false,
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
    pickStartDate (date) {
      this.examDetails.start = date
    },
    pickStartTime (time) {
      this.examDetails.startTime = time
    },
    pickEndTime (time) {
      this.examDetails.endTime = time
    },
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
  watch: {
    dialogNewExam (val) {
      if (!val) {
        this.editMode = false
        this.dialogNewExam = false
        this.examDetails.selectedClass = null
        this.examDetails.start = null
        this.examDetails.startTime = null
        this.examDetails.endTime = null
        this.examDetails.room = null
        this.examDetails.color = null
      }
    }
  },
  mounted () {
    this.fetchExams()
  }
}
</script>

<style scoped>
  @media screen and (min-width: 768px) {
    tr {
      height: 64px;
    }
  }
  .border {
    border-left: 3px solid;
  }
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
