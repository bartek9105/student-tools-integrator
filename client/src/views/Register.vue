<template>
  <div class="container d-flex align-center" style="height: 100vh;">
    <v-row class="justify-center">
      <v-col cols="12" xs="12" md="6">
        <div class="auth-form-container elevation-3">
          <div style="background-color: #1565C0;" class="white--text py-8 px-4 text-center">
            <p class="mb-0">Student Tools Integrator</p>
          </div>
          <v-form class="text-center px-8 py-8" @submit.prevent="signUp">
            <div class="d-flex justify-center flex-column">
              <v-icon color="blue" class="mb-4">toll</v-icon>
              Register
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
            <p class="mt-4 mb-4">Already have an account?
              <router-link to="login">
                Sign in
              </router-link>
            </p>
            <v-btn color="primary" type="submit">Register</v-btn>
          </v-form>
        </div>
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
    signUp () {
      this.$store.dispatch('signUp', {
        email: this.email,
        password: this.password
      }).then(() => {
        this.$store.dispatch('showSnackbar', {
          snackbar: true,
          color: 'success',
          text: 'Successfully registered. You can now sign in.'
        })
        this.$router.push('/login')
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

<style lang="scss" scoped>
@media screen and (min-width: 960px) {
  .container {
    padding: 0;
  }
}
</style>
