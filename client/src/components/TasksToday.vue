<template>
  <v-container>
    <div class="d-flex flex-column mb-4">
      <h3 class="mr-2 mb-4">Tasks due today</h3>
      <router-link to="/todo">Go to todo list view</router-link>
    </div>
    <div v-if="getTodaysTasks == 0">
      <p>No tasks for today</p>
    </div>
    <v-simple-table v-else class="elevation-2">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Task</th>
            <th class="text-left">Priority</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in getTodaysTasks" :key="task._id">
            <td>{{ task.name }}</td>
            <td v-if="task.priority">
              <v-chip
                class="ma-2"
                :color="task.priority.color"
                text-color="white"
                small
              >
                <v-avatar left>
                  <v-icon>flag</v-icon>
                </v-avatar>
                {{ task.priority.name }}
              </v-chip>
            </td>
            <td v-else>-</td>
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
