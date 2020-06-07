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
              v-model="selectedClass"
            ></v-select>
            <v-text-field type="text" label="Room" v-model="room"></v-text-field>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date"
                label="Date"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
            </v-date-picker>
            </v-menu>
            <div class="d-flex">
              <div>
                <TimePicker v-on:pickTime="changeStartTime($event)"/>
              </div>
              <div>
                <TimePicker v-on:pickTime="changeEndTime($event)"/>
              </div>
            </div>
            <ColorPicker v-if="colorPicker" v-on:changeColor="changeColor($event)"/>
            <div class="d-flex justify-space-between align-center">
              <v-btn type="submit" color="primary" class="mr-4" @click="addExam" @click.stop="dialogTask = false">
                Add exam
              </v-btn>
              <v-icon @click="colorPicker = !colorPicker">palette</v-icon>
            </div>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogUpdateExam" max-width="500">
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
              v-if="currentExam"
              v-model="currentExam.subject"
            ></v-select>
            <v-text-field type="text" label="Room" v-if="currentExam" v-model="currentExam.room"></v-text-field>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="currentExam.start"
                label="Date"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-if="currentExam" v-model="currentExam.start" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
            </v-date-picker>
            </v-menu>
            <div class="d-flex">
              <div>
                <TimePicker v-on:pickTime="updateStartTime($event)"/>
              </div>
              <div>
                <TimePicker v-on:pickTime="updateEndTime($event)"/>
              </div>
            </div>
            <ColorPicker v-if="colorPicker" v-on:changeColor="updateColor($event)"/>
            <div class="d-flex justify-space-between align-center">
              <v-btn type="submit" color="primary" class="mr-4" @click="editExam(currentExam)" @click.stop="dialogTask = false">
                Update exam
              </v-btn>
              <v-icon @click="colorPicker = !colorPicker">palette</v-icon>
            </div>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
    <v-simple-table class="elevation-1">
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
import TimePicker from '@/components/TimePicker'

export default {
  name: 'Exams',
  components: {
    Breadcrumbs,
    ColorPicker,
    TimePicker
  },
  data () {
    return {
      color: '',
      dialogNewExam: false,
      dialogUpdateExam: false,
      selectedClass: '',
      startTime: null,
      endTime: null,
      date: '',
      menu: false,
      room: '',
      colorPicker: false,
      editedExam: null,
      currentExam: null
    }
  },
  methods: {
    addExam () {
      this.$store.dispatch('addEvent', {
        title: this.selectedClass.name + ' exam',
        start: this.date + `T${this.startTime}`,
        end: this.date + `T${this.endTime}`,
        daysOfWeek: null,
        subject: this.selectedClass._id,
        room: this.room,
        color: this.color,
        exam: true
      }).then(() => {
        this.selectedClass = null
        this.date = null
        this.startTime = null
        this.room = null
        this.color = null
        this.dialogNewExam = false
        this.$store.dispatch('showSnackbar', {
          snackbar: true,
          color: 'success',
          text: 'New class scheduled'
        })
      })
    },
    editExam (exam) {
      this.$store.dispatch('editExamEvent', exam).then(() => {
        this.dialogUpdateExam = false
        this.$store.dispatch('showSnackbar', {
          snackbar: true,
          color: 'success',
          text: 'Exam scheduled'
        })
      })
    },
    fetchExams () {
      this.$store.dispatch('getEvents')
    },
    updateEditDialog (exam) {
      this.currentExam = {
        examId: exam._id,
        title: exam.title,
        room: exam.room,
        exam: true,
        subject: exam.subject,
        start: exam.start.substr(0, 10),
        end: exam.end.substr(0, 10),
        startTime: exam.start.substr(11, 15),
        endTime: exam.end.substr(11, 15)
      }
      this.dialogUpdateExam = true
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
      this.color = color
    },
    updateColor (color) {
      this.currentExam.color = color
    },
    changeStartTime (time) {
      this.startTime = time
    },
    changeEndTime (time) {
      this.endTime = time
    },
    updateStartTime (time) {
      this.currentExam.startTime = time
    },
    updateEndTime (time) {
      this.currentExam.endTime = time
    },
    pickTime (time) {
      this.startTime = time
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
