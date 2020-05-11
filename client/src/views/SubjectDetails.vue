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
    </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SubjectDetails',
  data () {
    return {
      subjectDetails: [],
      requirements: ''
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
    }
  },
  mounted () {
    this.getSubjectDetails()
  }
}
</script>

<style>

</style>
