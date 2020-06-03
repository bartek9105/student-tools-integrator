<template>
  <v-container>
    <div class="d-flex align-center mb-3">
        <h3 class="mr-2">Your tasks for today</h3>
    </div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Task</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in getTodaysTasks" :key="task._id">
            <td>{{ task.name }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
export default {
  name: 'TasksToday',
  computed: {
    getTodaysTasks () {
      return this.$store.getters.getTasks.filter(task => {
        return task.dueDate === new Date().toISOString().substr(0, 10)
      })
    }
  }
}
</script>

<style>

</style>
