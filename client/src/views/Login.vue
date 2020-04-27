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
        <router-link to="/">
          <v-btn color="primary">Login</v-btn>
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
  }
}
</script>

<style>

</style>
