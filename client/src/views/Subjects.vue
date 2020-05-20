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
          <div>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon class="mr-2" v-on="on" @click="displayList = true">reorder</v-icon>
              </template>
              <span>Display list</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon v-on="on" @click="displayList = false">view_module</v-icon>
              </template>
              <span>Display grid</span>
            </v-tooltip>
            <v-btn color="primary ml-4" v-if="subjects.length > 0" @click="dialogSubject = true">
              <v-icon class="mr-2">add</v-icon>
              Add subject
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-container v-if="subjects.length == 0" class="text-center">
      <p class="display-1 gray--text mb-8">
        Nothing here! Add your first subject
      </p>
      <v-btn color="primary" @click="dialogSubject = true">
        <v-icon class="mr-2">add</v-icon>
        Add subject
      </v-btn>
    </v-container>
    <v-form v-else>
      <v-container>
        <v-text-field
          v-model="search"
          label="Search"
          filled
        ></v-text-field>
        <v-simple-table v-if="displayList">
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
        <v-row v-else>
          <v-col cols="12" md="4" v-for="subject in subjectsFilter" :key="subject._id">
            <v-card
              class="mx-auto"
              max-width="500"
              outlined
              style="box-shadow: 0 0.75rem 1.5rem rgba(18,38,63,.03);"
            >
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-4"></div>
                  <router-link :to="'/subject/' + subject._id" v-if="editing !== subject._id">
                    <v-list-item-title class="headline mb-1">{{ subject.name }}</v-list-item-title>
                  </router-link>
                  <div v-else>
                    <v-text-field
                      v-model="editName"
                      label="Edit name"
                      class="mr-2"
                      small
                      required
                    ></v-text-field>
                    <v-btn text @click="updateSubject(subject._id)">Save</v-btn>
                  </div>
                </v-list-item-content>
              </v-list-item>

              <v-card-actions>
                <v-btn text @click="editing = subject._id">Edit</v-btn>
                <v-btn text @click="deleteSubject(subject._id)">Delete</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
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
      search: '',
      displayList: false
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
  .shadow {
    box-shadow: 0 0.75rem 1.5rem rgba(18,38,63,.03) !important;
  }
</style>
