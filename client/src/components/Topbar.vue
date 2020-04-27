<template>
  <v-card class="overflow-hidden">
    <v-app-bar
      absolute
      color="white"
      scroll-target="#scrolling-techniques-7"
    >

      <v-toolbar-title>{{ this.$route.name }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-icon>notifications</v-icon>

      <v-list-item-avatar>
        <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
      </v-list-item-avatar>

      <v-list-item>
        <router-link to="/login">
          Logout
        </router-link>
      </v-list-item>

    </v-app-bar>
    <v-sheet
      id="scrolling-techniques-7"
      class="overflow-y-auto"
      max-height="600"
    >
      <v-container style="height: 55px;">

      </v-container>
    </v-sheet>
  </v-card>
</template>

<script>
export default {

}
</script>

<style>

</style>
