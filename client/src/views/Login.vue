<template>
  <div class="container d-flex justify-items-center">
    <v-row>
      <v-col cols="12" md="3">
        <v-form class="text-center">
          <div class="d-flex justify-center">
            <v-icon color="blue">toll</v-icon>
          </div>
          <v-text-field
            v-model="email"
            label="E-mail"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            required
          ></v-text-field>
          <p>Already registered?
            <router-link to="register">
              Signup
            </router-link>
          </p>
          <v-btn color="primary" @click="signIn">Login</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signIn () {
      this.$store.dispatch('signIn', {
        email: this.email,
        password: this.password
      }).then(() => {
        this.$store.dispatch('showSnackbar', {
          snackbar: true,
          color: 'success',
          text: 'Successfully logged in'
        })
        this.$router.push('/')
      }).catch(err => {
        this.$store.dispatch('showSnackbar', {
          snackbar: true,
          color: 'error',
          text: `${err.response.data.error}`
        })
        console.log(err.response.data.error)
      })
    }
  }
}
</script>

<style lang="scss">
  .container {
    height: 100vh;
  }
</style>
