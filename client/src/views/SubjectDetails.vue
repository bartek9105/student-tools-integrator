<template>
    <v-container>
        <h1>{{ subjectDetails[0].name }}</h1>
    </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SubjectDetails',
  data () {
    return {
      subjectDetails: []
    }
  },
  methods: {
    async getSubjectDetails () {
      const res = await axios.get(`http://localhost:3000/subjects/${this.$route.params.id}`)
      this.subjectDetails.push(res.data)
    }
  },
  mounted () {
    this.getSubjectDetails()
  }
}
</script>

<style>

</style>
