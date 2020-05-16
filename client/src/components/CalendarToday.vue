<template>
    <v-container>
        <div class="d-flex align-center mb-3">
            <h3 class="mr-2">Today's events</h3>
            <span>{{ new Date().toISOString().substr(0, 10) }}</span>
        </div>
        <v-simple-table>
            <template v-slot:default>
            <thead>
                <tr>
                <th class="text-left">Event</th>
                <th class="text-left">Details</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="event in getTodaysEvents" :key="event._id">
                <td>
                    <v-icon :color="event.color">fiber_manual_record</v-icon>
                    {{ event.name }}
                    </td>
                <td>{{ event.details }}</td>
                </tr>
            </tbody>
            </template>
        </v-simple-table>
    </v-container>
</template>

<script>
export default {
  name: 'CalendarToday',
  data () {
    return {
    }
  },
  computed: {
    getTodaysEvents () {
      return this.$store.getters.eventsGetter.filter(event => {
        return event.start === new Date().toISOString().substr(0, 10)
      })
    }
  }
}
</script>

<style>

</style>
