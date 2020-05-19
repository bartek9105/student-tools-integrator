<template>
  <v-row>
    <v-col cols=12 md=6 class="px-0 py-0">
      <div class="hero-container">
        <div class="hero"></div>
        <div class="text">
          <p class="display-1 white--text">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde, corporis. Fugit minus consectetur impedit? Rem?
          </p>
        </div>
      </div>
    </v-col>
    <v-col cols=12 md=6 class="d-flex align-center justify-center">
      <v-form>
        <v-container>
          <v-row class="flex-column align-center">
            <v-col
              cols="12"
              md="12"
            >
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
            </v-col>
            <p>Already registered?
              <router-link to="register">
                Signup
              </router-link>
            </p>
            <v-btn color="primary" @click="signIn">Login</v-btn>
          </v-row>
        </v-container>
      </v-form>
    </v-col>
  </v-row>
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
  .hero-container {
    position: relative;
    .hero {
      background-image: url('../assets/hero.jpg');
      height: 100vh;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
    .text {
      position: absolute;
      top: 50%;
    }
  }
</style>
