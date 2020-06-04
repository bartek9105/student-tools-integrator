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
      <v-col cols="12" md="4">
        <p class="title">Requirements</p>
        <div class="d-flex justify-space-between align-center">
          <v-text-field
              v-model="requirements"
              label="Requirements"
              required
              class="mr-4"
          ></v-text-field>
          <v-btn color="primary" @click="addRequirement">Add</v-btn>
        </div>
        <v-list-item v-for="(requirement, index) in getSubjectDetails.requirements" :key="index">
          <v-list-item-content>
            <v-list-item-title>{{ requirement.name }}</v-list-item-title>
              <v-progress-circular
              :rotate="360"
              :size="50"
              :width="10"
              :value="requirement.progress"
              color="teal"
            >
              {{ requirement.progress }}
            </v-progress-circular>
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
      </v-col>
      <v-col cols="12" md="4">
        <p class="title">Attached files</p>
        <template>
          <div class="d-flex justify-space-between">
            <input type="file" name="file" ref="file" label="File input" @change="fileUpload">
            <v-btn class="primary" @click="submitFile">Send</v-btn>
          </div>
        </template>
        <v-divider class="mt-4"></v-divider>
        <v-card class="elevation-0">
          <v-list two-line subheader>
            <v-list-item
              v-for="file in uploadedFiles"
              :key="file._id"
            >
              <v-list-item-avatar>
                <v-icon>description</v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ file.filename }}</v-list-item-title>
                <v-list-item-subtitle>File</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action class="d-flex flex-row">
                <v-btn icon>
                  <v-icon color="grey lighten-1" @click="downloadFile(file.filename)">system_update_alt</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon color="grey lighten-1" @click="deleteFile(file._id)">clear</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <div class="d-flex flex-column align-center">
          <p class="title">Passing class progress</p>
          <!--<ChartRadial :labels="getReqsNames" :series="getReqsProgress"/>-->
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12">
        <Editor v-on:editNote="editNote($event)"/>
        <v-btn @click="addNote" class="primary mt-4">Add note</v-btn>
      </v-col>
    </v-row>
    <p class="mt-8 title">Notes</p>
    <!--
    <v-row>
      <v-col cols="12" md="2" v-for="(note, index) in subjectDetails.notes" :key="index">
        <v-card
          class="mx-auto overflow-hidden"
          max-width="344"
          height="150"
        >
          <v-card-text>
            <div class="text--primary text-limit" v-html="note">
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              text
              color="primary accent-4"
            >
              See more
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    -->
  </v-container>
</template>

<script>
import axios from 'axios'

// import ChartRadial from '@/components/ChartRadial'
import Editor from '@/components/Editor'

export default {
  name: 'SubjectDetails',
  components: {
    // ChartRadial,
    Editor
  },
  data () {
    return {
      subjectDetails: [],
      requirements: '',
      progress: 0,
      file: null,
      uploadedFiles: [],
      note: null,
      editReqDialog: false,
      currentReqs: {}
    }
  },
  methods: {
    editRequirement (reqId) {
      this.$store.dispatch('editRequirement', {
        reqId: reqId,
        requirement: this.currentReqs.name,
        progress: this.currentReqs.progress
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
      })
    },
    editNote (note) {
      this.note = note
    },
    fetchSubjectDetails () {
      this.$store.dispatch('fetchSubjectDetails', this.$route.params.id)
    },
    addRequirement () {
      this.$store.dispatch('addRequirement', {
        requirement: this.requirements,
        progress: this.progress,
        subjectId: this.$route.params.id
      }).then(() => {
        this.requirements = null
        this.progress = null
      })
    },
    async addNote () {
      try {
        await axios.patch(`http://localhost:3000/subjects/${this.$route.params.id}/updateNotes`, {
          note: this.note
        })
      } catch (error) {
        console.log(error)
      }
    },
    fileUpload () {
      this.file = this.$refs.file.files[0]
    },
    async submitFile () {
      const formData = new FormData()
      formData.append('file', this.file)
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
      this.uploadedFiles = files.data
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
        console.log(id)
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    getSubjectDetails () {
      return this.$store.getters.getSubjectDetails
    },
    getReqsNames () {
      return this.subjectDetails[0].requirements.map(el => el.name)
    },
    getReqsProgress () {
      return this.subjectDetails[0].requirements.map(el => el.progress)
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

<style>
  .text-limit {
    display: block;
    text-overflow: ellipsis;
    word-wrap: break-word;
    overflow: hidden;
    white-space: nowrap;
    max-height: 3.6em;
    line-height: 1.8em;
  }
</style>
