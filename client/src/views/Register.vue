<template>
  <v-form>
    <v-container>
      <v-row class="flex-column align-center">
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="email"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            required
          ></v-text-field>
        </v-col>
        <p>Already registered?
          <router-link to="login">
            Login
          </router-link>
        </p>
        <router-link to="/login">
          <v-btn color="primary" @click="signUp">Register</v-btn>
        </router-link>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async signUp () {
      try {
        const res = await axios.post('http://localhost:3000/user/register', {
          email: this.email,
          password: this.password
        })
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>

</style>
