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
      })
    }
  }
}
</script>

<style>

</style>
