<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12">
        <div class="d-flex justify-space-between">
          <Breadcrumbs/>
          <v-btn class="primary" @click="dialogTask = true">
            <v-icon class="mr-2">add</v-icon>
            Add task
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-dialog v-model="dialogProject" max-width="500">
      <v-card>
        <v-container>
          <v-form @submit.prevent>
            <v-text-field type="text" label="Project name" v-model="projectName"></v-text-field>
            <v-btn type="submit" color="primary" class="mr-4" @click="addProject" @click.stop="dialogProject = false">
              Create project
            </v-btn>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogTask" max-width="500">
      <v-card>
        <v-container>
          <v-form @submit.prevent>
            <v-text-field type="text" label="Task" v-model="taskName"></v-text-field>
            <v-select
              :items="projects"
              label="Select project"
              item-text="name"
              item-value="_id"
              solo
              v-model="selectedProject"
            ></v-select>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date"
                label="Due date"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
            </v-date-picker>
            </v-menu>
            <v-btn type="submit" color="primary" class="mr-4" @click="addTask" @click.stop="dialogTask = false">
              Create task
            </v-btn>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
    <v-row>
      <!-- Projects list -->
      <v-col cols="12" md="3">
        <v-card
          class="mx-auto rounded pb-4"
          max-width="400"
          tile
        >
        <v-text-field
          class="px-6 pt-6"
          label="Search"
          filled
        ></v-text-field>
        <div class="d-flex pl-6 mb-4" @click="dialogProject = true">
          <v-icon class="mr-2">add</v-icon>
          <span class="body-2">Add project</span>
        </div>
        <div class="d-flex pl-6 mb-4" v-for="project in projects" :key="project._id">
          <div @click="getTasksByProject(project._id)">
            <v-icon color="red" class="mr-4">
              fiber_manual_record
            </v-icon>
            <span class="caption">{{ project.name }}</span>
          </div>
        </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="9">
        <v-text-field
          label="Search"
          filled
        ></v-text-field>
        <!--Tasks list -->
        <v-simple-table class="mb-8 pt-4 elevation-1 rounded">
          <template v-slot:default>
            <thead>
              <span class="pt-6 pl-4 mb-4">Tasks</span>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr class="mt-2" v-for="task in tasks" :key="task._id">
                <td>{{ task.name }}</td>
                <td>
                  <v-menu offset-y>
                    <template v-slot:activator="{ on }">
                      <v-icon v-on="on">
                        more_vert
                      </v-icon>
                    </template>
                    <v-list>
                      <v-list-item>
                        <v-list-item-title class="body-2">
                          <v-icon class="mr-2">create</v-icon> Edit
                        </v-list-item-title>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-title class="body-2">
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
      </v-col>
    </v-row>
    <!--Chart-->
    <v-row>
      <v-col cols="12" md="12" class="white elevation-1 mt-8">
        <v-container>
          <Chart/>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
import Breadcrumbs from '@/components/Breadcrumbs'
import Chart from '@/components/Chart'

export default {
  name: 'Todo',
  components: {
    Breadcrumbs,
    Chart
  },
  data () {
    return {
      dialogTask: false,
      dialogProject: false,
      picker: new Date().toISOString().substr(0, 10),
      menu: false,
      projects: [],
      projectName: '',
      date: null,
      tasks: [],
      taskName: '',
      selectedProject: ''
    }
  },
  methods: {
    async getProjects () {
      try {
        const projects = await axios.get('http://localhost:3000/projects')
        this.projects = projects.data
      } catch (error) {
        console.log(error)
      }
    },
    async addProject () {
      try {
        const newProject = await axios.post('http://localhost:3000/projects/add', {
          name: this.projectName
        })
        this.projects.push(newProject.data)
      } catch (error) {
        console.log(error)
      }
    },
    async getTasks () {
      const tasks = await axios.get('http://localhost:3000/tasks')
      this.tasks = tasks.data
    },
    async addTask () {
      const newTask = await axios.post('http://localhost:3000/tasks/add', {
        name: this.taskName,
        project: this.selectedProject
      })
      this.tasks.push(newTask.data)
    },
    async getTasksByProject (id) {
      const filteredTasks = await axios.get(`http://localhost:3000/tasks/${id}`)
      this.tasks = filteredTasks.data
    }
  },
  mounted () {
    this.getProjects()
    this.getTasks()
  }
}
</script>

<style>

</style>
