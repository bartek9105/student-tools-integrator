<template>
    <v-simple-table class="mb-8 pt-4 elevation-1 rounded">
        <template v-slot:default>
        <thead>
            <span class="pt-6 pl-4 mb-4">Tasks</span>
            <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Due date</th>
            <th class="text-left">Action</th>
            </tr>
        </thead>
        <tbody>
            <tr class="mt-2" v-for="task in getTasks" :key="task._id">
            <div v-if="editedTask == task._id" >
                <v-text-field type="text" label="Edit task name" v-model="taskName"></v-text-field>
                <v-btn @click="editTask(task._id)">Save</v-btn>
            </div>
            <td v-else>{{ task.name }}</td>
            <td>{{ task.dueDate }}</td>
            <td>
                <v-menu offset-y>
                <template v-slot:activator="{ on }">
                    <v-icon v-on="on">
                    more_vert
                    </v-icon>
                </template>
                <v-list>
                    <v-list-item>
                    <v-list-item-title class="body-2" @click="editedTask = task._id">
                        <v-icon class="mr-2">create</v-icon> Edit
                    </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                    <v-list-item-title class="body-2" @click="deleteTask(task._id)">
                        <v-icon class="mr-2">delete</v-icon> Delete
                    </v-list-item-title>
                    </v-list-item>
                </v-list>
                </v-menu>
            </td>
            </tr>
        </tbody>
        </template>
    </v-simple-table>
</template>

<script>
import axios from 'axios'

export default {
  name: 'TodoList',
  data () {
    return {
      editedTask: null,
      date: null,
      taskName: ''
    }
  },
  computed: {
    getTasks () {
      return this.$store.getters.getTasks
    }
  },
  methods: {
    fetchTasks () {
      this.$store.dispatch('fetchTasks')
    },
    async addTask () {
      await axios.post('http://localhost:3000/tasks/add', {
        name: this.taskName,
        project: this.selectedProject,
        dueDate: this.date
      })
      this.fetchTasks()
      this.taskName = ''
    },
    async deleteTask (id) {
      try {
        await axios.delete(`http://localhost:3000/tasks/${id}/delete`)
        this.fetchTasks()
      } catch (error) {
        console.log(error)
      }
    },
    async editTask (id) {
      try {
        await axios.patch(`http://localhost:3000/tasks/${id}/edit`, {
          name: this.taskName
        })
        this.fetchTasks()
        this.editedTask = null
        this.taskName = ''
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted () {
    this.fetchTasks()
  }
}
</script>

<style>

</style>
