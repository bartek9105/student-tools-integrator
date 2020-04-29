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
        <p>Don't have an account?
          <router-link to="register">
            Signup
          </router-link>
        </p>
        <v-btn color="primary" @click="signIn">Login</v-btn>
      </v-row>
    </v-container>
  </v-form>
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
        this.$router.push('/')
      })
    }
  }
}
</script>

<style>

</style>
