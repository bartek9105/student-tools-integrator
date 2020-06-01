<template>
  <v-container>
    <v-dialog v-model="dialogSubject" max-width="500">
      <v-card>
        <v-container>
          <v-form @submit.prevent>
            <v-text-field type="text" label="Subject name" v-model="subjectName"></v-text-field>
            <v-text-field type="text" label="Teacher" v-model="teacherName"></v-text-field>
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
            <v-btn color="primary ml-4" v-if="getSubjects.length > 0" @click="dialogSubject = true">
              <v-icon class="mr-2">add</v-icon>
              Add subject
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-container v-if="getSubjects.length == 0" class="text-center">
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
        <v-row>
          <v-col cols="12" md="4" v-for="subject in subjectsFilter" :key="subject._id">
            <v-card
              class="mx-auto"
              max-width="500"
              style="box-shadow: 0 0.75rem 1.5rem rgba(18,38,63,.03);"
            >
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-4"></div>
                  <router-link :to="'/subject/' + subject._id" v-if="editing !== subject._id" class="router">
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
      teacherName: '',
      editing: null,
      editName: '',
      search: '',
      displayList: false
    }
  },
  methods: {
    addSubject () {
      this.$store.dispatch('addSubject', {
        name: this.subjectName,
        teacher: this.teacherName
      }).then(() => {
        this.subjectName = ''
        this.$store.dispatch('showSnackbar', {
          snackbar: true,
          color: 'success',
          text: 'New subject added'
        })
      }).catch(err => {
        console.log(err)
        this.$store.dispatch('showSnackbar', {
          snackbar: true,
          color: 'error',
          text: err
        })
      })
    },
    fetchSubjects () {
      this.$store.dispatch('fetchSubjects')
    },
    async updateSubject (id) {
      try {
        axios.patch(`http://localhost:3000/subjects/${id}/edit`, {
          name: this.editName
        })
        this.editing = null
        this.editName = ''
        this.fetchSubjects()
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
        this.fetchSubjects()
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
      return this.getSubjects.filter(subject => {
        return subject.name.toLowerCase().match(this.search)
      })
    },
    getSubjects () {
      return this.$store.getters.getSubjects
    }
  },
  mounted () {
    this.fetchSubjects()
  }
}
</script>

<style>
  .shadow {
    box-shadow: 0 0.75rem 1.5rem rgba(18,38,63,.03) !important;
  }
  .router {
    color: rgba(0, 0, 0, 0.87) !important;
  }
</style>
