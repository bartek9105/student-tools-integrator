<template>
  <v-container>
    <p class="headline">{{ subjectDetails[0].name }}</p>
    <v-row class="justify-space-between">
      <v-col cols="12" md="4">
        <p>Requirements</p>
        <v-text-field
            v-model="requirements"
            label="Requirements"
            required
        ></v-text-field>
        <v-btn small color="primary" @click="addRequirement">Add</v-btn>
        <v-list-item v-for="(requirement, index) in subjectDetails[0].requirements" :key="index">
          <v-list-item-content>
              <v-list-item-title>{{ requirement }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col cols="12" md="4">
        <p>Attached files</p>
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
                <v-list-item-subtitle>dummy</v-list-item-subtitle>
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
          <p>Passing class progress</p>
          <ChartRadial/>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'

import ChartRadial from '@/components/ChartRadial'

export default {
  name: 'SubjectDetails',
  components: {
    ChartRadial
  },
  data () {
    return {
      subjectDetails: [],
      requirements: '',
      file: null,
      uploadedFiles: []
    }
  },
  methods: {
    async getSubjectDetails () {
      const res = await axios.get(`http://localhost:3000/subjects/${this.$route.params.id}`)
      this.subjectDetails.push(res.data)
    },
    async addRequirement () {
      try {
        await axios.patch(`http://localhost:3000/subjects/${this.$route.params.id}/update`, {
          requirement: this.requirements
        })
        this.subjectDetails[0].requirements.push(this.requirements)
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
  mounted () {
    this.getSubjectDetails()
    this.getUploadedFiles()
  },
  updated () {
    this.getUploadedFiles()
  }
}
</script>

<style>

</style>
