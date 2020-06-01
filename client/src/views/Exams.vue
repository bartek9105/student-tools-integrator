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
              :items="getSubjects"
              label="Select class"
              item-text="name"
              item-value="_id"
              solo
              v-model="selectedClass"
            ></v-select>
            <v-text-field type="text" label="Duration (minutes)" v-model="duration"></v-text-field>
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
              :items="getSubjects"
              label="Select class"
              item-text="name"
              item-value="_id"
              solo
              v-if="currentExam"
              v-model="currentExam.subject.name"
            ></v-select>
            <v-text-field type="text" label="Duration (minutes)" v-if="currentExam" v-model="currentExam.duration"></v-text-field>
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
                v-model="date"
                label="Date"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-if="currentExam" v-model="currentExam.date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
            </v-date-picker>
            </v-menu>
            <ColorPicker v-if="colorPicker" v-on:changeColor="updateColor($event)"/>
            <div class="d-flex justify-space-between align-center">
              <v-btn type="submit" color="primary" class="mr-4" @click="editExam(currentExam._id)" @click.stop="dialogTask = false">
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
              Duration
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
              <router-link :to="'/subject/' + exam.subject._id">{{ exam.subject.name }}</router-link>
            </td>
            <td>{{ exam.date }}</td>
            <td>{{ exam.duration }} minutes</td>
            <td>Person</td>
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
import axios from 'axios'

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
      color: '',
      dialogNewExam: false,
      dialogUpdateExam: false,
      selectedClass: '',
      date: '',
      menu: false,
      room: '',
      duration: '',
      colorPicker: false,
      editedExam: null,
      currentExam: null
    }
  },
  methods: {
    addExam () {
      this.$store.dispatch('addExam', {
        subject: this.selectedClass,
        date: this.date,
        duration: this.duration,
        room: this.room,
        color: this.color
      }).then(() => {
        this.dialogNewExam = false
        this.selectedClass = ''
        this.date = ''
        this.duration = ''
        this.room = ''
        this.color = ''
        this.$store.dispatch('showSnackbar', {
          snackbar: true,
          color: 'success',
          text: 'Exam added'
        })
      }).catch(err => console.log(err))
    },
    fetchExams () {
      this.$store.dispatch('fetchExams')
    },
    async editExam (id) {
      try {
        await axios.patch(`http://localhost:3000/exams/${id}/edit`, {
          date: this.currentExam.date,
          duration: this.currentExam.duration,
          room: this.currentExam.room,
          color: this.currentExam.color
        })
        this.dialogUpdateExam = false
        this.getExams()
        this.$store.dispatch('showSnackbar', {
          snackbar: true,
          color: 'success',
          text: 'Exam details updated'
        })
      } catch (error) {
        console.log(error)
      }
    },
    updateEditDialog (exam) {
      this.currentExam = exam
      this.dialogUpdateExam = true
    },
    deleteExam (examId) {
      this.$store.dispatch('deleteExam', examId)
    },
    changeColor (color) {
      this.color = color
    },
    updateColor (color) {
      this.currentExam.color = color
    }
  },
  computed: {
    getSubjects () {
      return this.$store.getters.getSubjects
    },
    getExams () {
      return this.$store.getters.getExams
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
