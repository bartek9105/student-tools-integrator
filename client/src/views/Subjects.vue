<template>
  <v-container>
    <v-dialog v-model="dialogSubject" max-width="500">
      <v-card>
        <v-container>
          <v-form @submit.prevent>
            <v-text-field type="text" label="Subject name" v-model="subjectName"></v-text-field>
            <v-text-field type="text" label="Teacher" v-model="teacherName"></v-text-field>
            <v-text-field type="text" label="Description" v-model="description"></v-text-field>
            <ColorPicker v-if="colorPicker" v-on:changeColor="changeColor($event)"/>
            <div class="d-flex justify-space-between align-center">
              <v-btn type="submit" color="primary" class="mr-4" @click="addSubject" @click.stop="dialogSubject = false">
                Create subject
              </v-btn>
              <v-icon @click="colorPicker = !colorPicker">palette</v-icon>
            </div>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogEditSubject" max-width="500">
      <v-card>
        <v-container>
          <v-form @submit.prevent>
            <v-text-field type="text" label="Subject name" v-if="currentSubject" v-model="currentSubject.name"></v-text-field>
            <v-text-field type="text" label="Teacher" v-if="currentSubject" v-model="currentSubject.teacher"></v-text-field>
            <v-text-field type="text" label="Description" v-if="currentSubject" v-model="currentSubject.description"></v-text-field>
            <ColorPicker v-if="colorPicker" v-on:changeColor="changeSubjectColor($event)"/>
            <div class="d-flex justify-space-between align-center">
              <v-btn type="submit" color="primary" class="mr-4" @click="editSubject(currentSubject._id)" @click.stop="dialogEditSubject = false">
                Edit subject
              </v-btn>
              <v-icon @click="colorPicker = !colorPicker">palette</v-icon>
            </div>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
    <v-row>
      <v-col cols="12">
        <div class="d-flex justify-space-between align-center">
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
        <v-text-field v-model="search" label="Search" filled></v-text-field>
        <v-row>
          <v-col cols="12" md="4" v-for="subject in subjectsFilter" :key="subject._id">
            <v-card
              class="mx-auto"
              max-width="500"
              style="box-shadow: 0 0.75rem 1.5rem rgba(18,38,63,.03); border-left: 4px solid;"
              :style="{'border-left-color':subject.color}"
            >
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-4"></div>
                  <div class="d-flex justify-space-between">
                    <router-link :to="'/subject/' + subject._id" class="router">
                      <v-list-item-title class="subtitle-1 mb-1">
                        {{ subject.name }}
                      </v-list-item-title>
                    </router-link>
                    <v-menu offset-y>
                      <template v-slot:activator="{ on }">
                        <v-icon color="primary" dark v-on="on">
                          more_vert
                        </v-icon>
                      </template>
                      <v-list>
                        <v-list-item>
                          <v-list-item-title>
                            <v-btn text @click="updateSubjectDialog(subject)">Edit</v-btn>
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-title>
                            <v-btn text @click="deleteSubject(subject._id)">Delete</v-btn>
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </div>
                  <p class="caption mt-2">{{ subject.description }}</p>
                  <div class="d-flex align-center caption mt-8">
                    <v-icon class="mr-2">person</v-icon> Teacher: {{ subject.teacher }}
                    <v-icon class="mr-2 ml-2">note</v-icon> Requirements: {{ subject.requirements.length }}
                  </div>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs'
import ColorPicker from '@/components/ColorPicker'

export default {
  name: 'Subjects',
  components: {
    Breadcrumbs,
    ColorPicker
  },
  data () {
    return {
      dialogSubject: false,
      dialogEditSubject: false,
      subjectName: '',
      teacherName: '',
      editing: null,
      editName: '',
      search: '',
      displayList: false,
      borderColor: null,
      colorPicker: false,
      description: null,
      currentSubject: null
    }
  },
  methods: {
    addSubject () {
      this.$store.dispatch('addSubject', {
        name: this.subjectName,
        teacher: this.teacherName,
        color: this.borderColor,
        description: this.description
      }).then(() => {
        this.subjectName = ''
        this.teacherName = ''
        this.borderColor = ''
        this.description = ''
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
    updateSubjectDialog (currentSubject) {
      this.dialogEditSubject = true
      this.currentSubject = currentSubject
    },
    fetchSubjects () {
      this.$store.dispatch('fetchSubjects')
    },
    editSubject (id) {
      this.$store.dispatch('editSubject', this.currentSubject).then(() => {
        this.$store.dispatch('showSnackbar', {
          snackbar: true,
          color: 'success',
          text: 'Subject updated'
        })
      }).catch(err => {
        this.$store.dispatch('showSnackbar', {
          snackbar: true,
          color: 'error',
          text: err
        })
      })
    },
    async deleteSubject (subjectId) {
      this.$store.dispatch('deleteSubject', subjectId).then(() => {
        this.$store.dispatch('showSnackbar', {
          snackbar: true,
          color: 'success',
          text: 'Subject deleted'
        })
      }).catch(err => {
        this.$store.dispatch('showSnackbar', {
          snackbar: true,
          color: 'error',
          text: err
        })
      })
    },
    changeColor (color) {
      this.borderColor = color
    },
    changeSubjectColor (color) {
      this.currentSubject.color = color
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
