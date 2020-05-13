<template>
    <v-container>
        <h1>{{ subjectDetails[0].name }}</h1>
        <h3>Requirements</h3>
        <v-row>
            <v-col
            cols="12"
            md="2"
            >
            <v-text-field
                v-model="requirements"
                label="Requirements"
                required
            ></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
            <v-btn small color="primary" @click="addRequirement">Add</v-btn>
            </v-col>
        </v-row>
        <v-card
            max-width="400"
            tile
        >
            <v-list-item v-for="(requirement, index) in subjectDetails[0].requirements" :key="index">
              <v-list-item-content>
                  <v-list-item-title>{{ requirement }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
        </v-card>

        <h3>Upload files</h3>
        <template>
          <input type="file" name="file" ref="file" label="File input" @change="fileUpload">
          <button @click="submitFile">Send</button>
        </template>
        <div>
          <v-card
            width="344"
            outlined
            v-for="file in uploadedFiles" :key="file._id"
          >
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">File</div>
                <v-list-item-title class="headline mb-1">{{ file.filename }}</v-list-item-title>
              </v-list-item-content>
            <v-icon>attachment</v-icon>
            </v-list-item>

            <v-card-actions>
              <v-btn text @click="downloadFile(file.filename)">View</v-btn>
              <v-btn text @click="deleteFile(file._id)">Delete</v-btn>
            </v-card-actions>
          </v-card>
        </div>
    </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SubjectDetails',
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
