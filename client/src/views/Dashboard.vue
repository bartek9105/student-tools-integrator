<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <UpcomingEvents/>
      </v-col>
      <v-col cols="12" md="6">
        <TodoList/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UpcomingEvents from '@/components/UpcomingEvents'
import TodoList from '@/components/TodoList'

export default {
  name: 'Dashboard',
  components: {
    UpcomingEvents,
    TodoList
  }
}
</script>
