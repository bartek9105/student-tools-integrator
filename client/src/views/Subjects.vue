<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="10"
        >
          <v-text-field
            v-model="subjectName"
            label="Subject name"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2">
          <v-btn small color="primary" @click="addSubject">Add</v-btn>
        </v-col>
      </v-row>
      <v-card
        class="mx-auto"
        tile
      >
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="subject in subjects" :key="subject._id">
              <td>{{ subject.name }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      </v-card>
    </v-container>
  </v-form>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Subjects',
  data () {
    return {
      subjectName: '',
      subjects: []
    }
  },
  methods: {
    async addSubject () {
      try {
        const res = await axios.post('http://localhost:3000/subjects/add', {
          name: this.subjectName
        })
        this.subjects.push(res.data.subject)
      } catch (error) {
        console.log(error)
      }
    },
    async getSubjects () {
      try {
        await axios.get('http://localhost:3000/subjects').then(res => {
          this.subjects = res.data
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted () {
    this.getSubjects()
  }
}
</script>

<style>

</style>
