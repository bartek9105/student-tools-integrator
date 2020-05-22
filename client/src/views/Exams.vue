<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" class="px-0">
          <div class="d-flex justify-space-between align-center">
            <Breadcrumbs/>
            <v-btn color="primary ml-4" @click="dialogExam = true">
              <v-icon class="mr-2">add</v-icon>
              Add exam
            </v-btn>
          </div>
      </v-col>
    </v-row>
    <v-dialog v-model="dialogExam" max-width="500">
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
            <v-text-field type="text" label="Duration" v-model="duration"></v-text-field>
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
          <tr v-for="exam in exams" :key="exam._id">
            <td class="border" :style="{'border-left-color': color}">{{ exam.subject.name }}</td>
            <td>
              {{ exam.date }}
              <v-chip
                class="ma-2"
                color="green"
                text-color="white"
                small
                >
                <v-avatar
                  left
                  class="green darken-4"
                >
                3
                </v-avatar>
                days left
              </v-chip>
            </td>
            <td>{{ exam.duration }}</td>
            <td>Person</td>
            <td>{{ exam.room }}</td>
            <td>
              <v-icon class="mr-2">more_vert</v-icon>
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
      dialogExam: false,
      selectedClass: '',
      date: '',
      menu: false,
      room: '',
      duration: '',
      colorPicker: false,
      exams: []
    }
  },
  methods: {
    async addExam () {
      try {
        await axios.post('http://localhost:3000/exams/add', {
          subject: this.selectedClass,
          date: this.date,
          duration: this.duration,
          room: this.room
        })
        this.dialogExam = false
        this.getExams()
      } catch (error) {
        console.log(error)
      }
    },
    async getExams () {
      try {
        const exams = await axios.get('http://localhost:3000/exams')
        this.exams = exams.data
      } catch (error) {
        console.log(error)
      }
    },
    changeColor (color) {
      this.color = color
    }
  },
  computed: {
    getSubjects () {
      return this.$store.getters.getSubjects
    }
  },
  mounted () {
    this.getExams()
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
