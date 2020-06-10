<template>
  <v-container>
    <v-dialog v-model="editReqDialog" max-width="500">
      <v-card>
        <v-container>
          <v-form @submit.prevent>
            <v-text-field type="text" label="Name" v-if="currentReqs" v-model="currentReqs.name"></v-text-field>
            <v-text-field type="number" label="Progress" v-if="currentReqs" v-model="currentReqs.progress"></v-text-field>
            <v-btn type="submit" color="primary" class="mr-4" @click="editRequirement(currentReqs._id)" @click.stop="editReqDialog = false">
              Update
            </v-btn>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
    <p class="headline">{{ getSubjectDetails.name }}</p>
    <v-row class="justify-space-between">
      <v-col cols="12" sm="12" md="6" lg="4">
        <p class="title">Requirements</p>
        <div class="d-flex justify-space-between align-center">
          <v-text-field
            v-model="requirements"
            label="Requirements"
            required
            class="mr-4"
          ></v-text-field>
        </div>
        <v-btn color="primary" @click="addRequirement">Add</v-btn>
        <p class="title text-center mt-8" v-if="getSubjectDetails.requirements.length == 0">
          No requirements added
        </p>
        <v-card v-for="(requirement, index) in getSubjectDetails.requirements" :key="index" class="mt-8 mb-4">
          <v-list-item class="d-flex justify-space-between align-center">
            <v-list-item-content class="d-flex align-center">
              <v-progress-circular
                :rotate="360"
                :size="40"
                :width="2"
                :value="requirement.progress"
                color="green"
                class="flex-none mr-4"
              >
                {{ requirement.progress }}
              </v-progress-circular>
              <v-list-item-title class="flex-none">{{ requirement.name }}</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action class="d-flex flex-row">
              <v-btn icon>
                <v-icon color="grey lighten-1" @click="updateReqDialog(requirement)">create</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon color="grey lighten-1" @click="deleteRequirement(getSubjectDetails._id, requirement._id)">clear</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="6" lg="4">
        <p class="title">Attached files</p>
        <template>
          <div>
            <input type="file" name="file" ref="file" label="File input" class="mt-4" @change="fileUpload">
          </div>
        </template>
        <v-btn class="primary mt-4" @click="submitFile">Upload file</v-btn>
        <p class="title text-center mt-8" v-if="uploadedFiles.length == 0">
          No files uploaded
        </p>
        <v-card class="elevation-1 mb-4 mt-8" v-else v-for="file in uploadedFiles" :key="file._id">
          <v-list two-line subheader>
            <v-list-item
            >
              <v-list-item-avatar>
                <v-icon>description</v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ file.filename.filename }}</v-list-item-title>
                <v-list-item-subtitle>File</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action class="d-flex flex-row">
                <v-btn icon>
                  <v-icon color="grey lighten-1" @click="downloadFile(file.filename.filename)">system_update_alt</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon color="grey lighten-1" @click="deleteFile(file._id)">clear</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="12" lg="4">
        <div class="d-flex flex-column align-center">
          <p class="title">Passing class progress</p>
          <ChartRadial :labels="getLabels" :series="getSeries"/>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12">
        <quill-editor
          ref="myQuillEditor"
          v-model="note.content"
          style="background-color:#fff;"
          class="elevation-1"
        />
        <div v-if="editMode" class="mt-4">
          <v-btn @click="editNote" class="primary mr-4">Edit note</v-btn>
          <v-btn @click="cancelEdit">Cancel</v-btn>
        </div>
        <v-btn v-else @click="addNote" class="primary mt-4">Add note</v-btn>
      </v-col>
    </v-row>
    <p class="mt-8 title">Notes</p>
    <v-row>
      <p class="title text-center mt-4 ml-3" v-if="getSubjectDetails.notes.length == 0">
        No notes added
      </p>
      <v-col cols="12" xs="12" sm="6" v-else v-for="(note, index) in getSubjectDetails.notes" :key="index">
        <v-card
          class="overflow-hidden"
        >
          <div>
            <v-card-text style="height: 170px;">
              <div class="text--primary text-limit mb-0" v-html="note.content">
              </div>
            </v-card-text>
          </div>
          <v-card-actions>
            <v-btn
              text
              color="primary accent-4"
              @click="displayFullNote(note.content)"
            >
              See more
            </v-btn>
            <v-btn text @click="editNoteMode(note)">Edit</v-btn>
            <v-btn text @click="deleteNote(note._id)">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-dialog v-model="dialog" width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Note</span>
          </v-card-title>
          <v-card-text v-html="currentNote"></v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>

import axios from 'axios'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import ChartRadial from '@/components/ChartRadial'
import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'SubjectDetails',
  components: {
    ChartRadial,
    quillEditor
  },
  data () {
    return {
      requirements: '',
      progress: 0,
      file: null,
      uploadedFiles: [],
      note: {
        content: null,
        _id: null
      },
      editReqDialog: false,
      currentReqs: {},
      editMode: false,
      dialog: false,
      currentNote: null
    }
  },
  methods: {
    displayFullNote (note) {
      this.dialog = true
      this.currentNote = note
    },
    cancelEdit () {
      this.editMode = false
      this.note.content = null
    },
    editNote () {
      this.$store.dispatch('editNote', {
        note: this.note.content,
        noteId: this.note._id
      }).then(() => {
        this.editMode = false
        this.note.content = null
        this.$store.dispatch('showSnackbar', {
          snackbar: true,
          color: 'success',
          text: 'Note updated'
        })
      })
    },
    editNoteMode (note) {
      this.note = note
      this.editMode = true
    },
    deleteNote (noteId) {
      this.$store.dispatch('deleteNote', {
        noteId: noteId,
        subjectId: this.$route.params.id
      }).then(() => {
        this.$store.dispatch('showSnackbar', {
          snackbar: true,
          color: 'success',
          text: 'Note deleted'
        })
      })
    },
    editRequirement (reqId) {
      this.$store.dispatch('editRequirement', {
        reqId: reqId,
        requirement: this.currentReqs.name,
        progress: this.currentReqs.progress
      }).then(() => {
        this.$store.dispatch('showSnackbar', {
          snackbar: true,
          color: 'success',
          text: 'Requirement updated'
        })
      })
    },
    updateReqDialog (requirement) {
      this.currentReqs = requirement
      this.editReqDialog = true
    },
    deleteRequirement (subjectId, reqId) {
      this.$store.dispatch('deleteRequirement', {
        subjectId: subjectId,
        reqId: reqId
      }).then(() => {
        this.$store.dispatch('showSnackbar', {
          snackbar: true,
          color: 'success',
          text: 'Requirement deleted'
        })
      })
    },
    fetchSubjectDetails () {
      this.$store.dispatch('fetchSubjectDetails', this.$route.params.id)
    },
    addRequirement () {
      if (this.requirements !== '') {
        this.$store.dispatch('addRequirement', {
          requirement: this.requirements,
          progress: this.progress,
          subjectId: this.$route.params.id
        }).then(() => {
          this.requirements = null
          this.progress = 0
          this.$store.dispatch('showSnackbar', {
            snackbar: true,
            color: 'success',
            text: 'Requirement added'
          })
        })
      }
      this.$store.dispatch('showSnackbar', {
        snackbar: true,
        color: 'error',
        text: 'Requirement name cannot be empty'
      })
    },
    addNote () {
      this.$store.dispatch('addNote', {
        note: this.note.content,
        subjectId: this.$route.params.id
      }).then(() => {
        this.note.content = null
        this.$store.dispatch('showSnackbar', {
          snackbar: true,
          color: 'success',
          text: 'Note added'
        })
      })
    },
    fileUpload () {
      this.file = this.$refs.file.files[0]
    },
    async submitFile () {
      const formData = new FormData()
      formData.append('file', this.file)
      formData.append('subjectId', this.$route.params.id)
      try {
        await axios.post('http://localhost:3000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
    async getUploadedFiles () {
      const files = await axios.get('http://localhost:3000/files')
      this.uploadedFiles = files.data.filter(el => {
        return el.filename.metadata === this.$route.params.id
      })
    },
    downloadFile (fileName) {
      axios.get(`http://localhost:3000/files/${fileName}`, {
        responseType: 'blob'
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `${fileName}`)
        document.body.appendChild(link)
        link.click()
      })
    },
    async deleteFile (id) {
      try {
        await axios.delete(`http://localhost:3000/file/${id}`)
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    getSubjectDetails () {
      return this.$store.getters.getSubjectDetails
    },
    getLabels () {
      return this.getSubjectDetails.requirements.map(el => {
        if (typeof el.name === 'string') {
          return el.name
        }
      })
    },
    getSeries () {
      const series = this.getSubjectDetails.requirements.map(el => el.progress)
      return series.map(el => parseInt(el))
    },
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  },
  mounted () {
    this.fetchSubjectDetails()
    this.getUploadedFiles()
  },
  updated () {
    this.getUploadedFiles()
  }
}
</script>

<style scoped>
  .text-limit {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
  }
  .flex-none {
    flex: none;
  }
</style>
