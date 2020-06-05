<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <UpcomingEvents/>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <TasksToday/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UpcomingEvents from '@/components/UpcomingEvents'
import TasksToday from '@/components/TasksToday'

export default {
  name: 'Dashboard',
  components: {
    UpcomingEvents,
    TasksToday
  }
}
</script>
