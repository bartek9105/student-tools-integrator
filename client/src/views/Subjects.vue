<template>
  <v-container>
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
    <v-row>
      <v-col cols="12">
        <div class="d-flex justify-space-between">
          <Breadcrumbs/>
          <v-btn color="primary" @click="dialogSubject = true">
            <v-icon class="mr-2">add</v-icon>
            Add subject
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-container v-if="subjects.length == 0" class="d-flex justify-center">
      <p class="display-1 gray--text">
        Nothing here! Add your first subject
      </p>
    </v-container>
    <v-form v-else>
      <v-container>
        <v-text-field
          v-model="search"
          label="Search"
          filled
        ></v-text-field>
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
              <tr>
              </tr>
            </thead>
            <tbody>
              <tr v-for="subject in subjectsFilter" :key="subject._id">
                <td class="d-flex justify-space-between align-center" color="red">
                  <div>
                    <router-link :to="'/subject/' + subject._id" v-if="editing !== subject._id">
                      {{ subject.name }}
                    </router-link>
                    <div class="d-flex align-center" v-else>
                      <v-text-field
                        v-model="editName"
                        label="Edit name"
                        class="mr-2"
                        small
                        required
                      ></v-text-field>
                      <v-btn color="primary" @click="updateSubject(subject._id)">Save</v-btn>
                    </div>
                  </div>
                  <div>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-icon class="mr-2" @click="editing = subject._id" v-on="on">create</v-icon>
                      </template>
                      <span>Edit subject name</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-icon v-on="on" @click="deleteSubject(subject._id)">delete</v-icon>
                      </template>
                      <span>Delete subject</span>
                    </v-tooltip>
                  </div>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        </v-card>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
import axios from 'axios'
import Breadcrumbs from '@/components/Breadcrumbs'

export default {
  name: 'Subjects',
  components: {
    Breadcrumbs
  },
  data () {
    return {
      dialogSubject: false,
      subjectName: '',
      subjects: [],
      editing: null,
      editName: '',
      search: ''
    }
  },
  methods: {
    async addSubject () {
      try {
        const res = await axios.post('http://localhost:3000/subjects/add', {
          name: this.subjectName
        })
        this.subjectName = ''
        this.subjects.push(res.data.subject)
        this.$store.dispatch('showSnackbar', {
          snackbar: true,
          color: 'success',
          text: 'New subject added'
        })
      } catch (error) {
        console.log(error)
        this.$store.dispatch('showSnackbar', {
          snackbar: true,
          color: 'error',
          text: error
        })
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
    },
    async updateSubject (id) {
      try {
        axios.patch(`http://localhost:3000/subjects/${id}/edit`, {
          name: this.editName
        })
        this.editing = null
        this.editName = ''
        this.getSubjects()
        this.$store.dispatch('showSnackbar', {
          snackbar: true,
          color: 'success',
          text: 'Subject name updated'
        })
      } catch (error) {
        console.log(error)
        this.$store.dispatch('showSnackbar', {
          snackbar: true,
          color: 'error',
          text: error
        })
      }
    },
    async deleteSubject (id) {
      try {
        axios.delete(`http://localhost:3000/subjects/${id}/delete`)
        this.$store.dispatch('showSnackbar', {
          snackbar: true,
          color: 'success',
          text: 'Subject deleted'
        })
        this.getSubjects()
      } catch (error) {
        console.log(error)
        this.$store.dispatch('showSnackbar', {
          snackbar: true,
          color: 'error',
          text: error
        })
      }
    }
  },
  computed: {
    subjectsFilter () {
      return this.subjects.filter(subject => {
        return subject.name.toLowerCase().match(this.search)
      })
    }
  },
  mounted () {
    this.getSubjects()
  }
}
</script>

<style>

</style>
