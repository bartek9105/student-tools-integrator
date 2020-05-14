<template>
  <v-container>
    <v-card
      class="mx-auto"
      max-width="400"
      tile
    >
      <h1>Upcoming events</h1>
      <p v-if="getEvents.length < 1">No events</p>
      <v-list-item two-line v-else v-for="event in getEvents" :key="event._id">
        <v-list-item-content>
          <v-list-item-title>{{ event.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ event.details }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <router-link to="/calendar">Go to calendar</router-link>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'Upcoming Events',
  data () {
    return {

    }
  },
  computed: {
    getEvents () {
      return this.$store.getters.eventsGetter
    }
  }
}
</script>

<style>

</style>
