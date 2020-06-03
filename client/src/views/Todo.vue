<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12">
        <div>
          <Breadcrumbs/>
        </div>
      </v-col>
    </v-row>
    <!-- Add project dialog -->
    <v-dialog v-model="dialogProject" max-width="500">
      <v-card>
        <v-container>
          <v-form @submit.prevent>
            <div class="d-flex">
              <v-text-field type="text" label="Project name" v-model="projectName"></v-text-field>
              <v-icon @click="colorPicker = !colorPicker">palette</v-icon>
            </div>
            <ColorPicker class="mb-8 ml-0" v-if="colorPicker" v-model="color" v-on:changeColor="changeColor($event)"/>
            <v-btn type="submit" color="primary" class="mr-4" @click="addProject" @click.stop="dialogProject = false">
              Create project
            </v-btn>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
    <!-- Add task dialog -->
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
            <v-select
              :items="priorities"
              label="Select priority"
              item-text="name"
              item-value="color"
              return-object
              solo
              v-model="selectedPriority"
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
      <v-col cols="12" sm="12" md="3">
        <v-card
          class="mx-auto rounded px-4 py-6"
          max-width="400"
          tile
        >
        <div class="d-flex align-center mb-4" @click="dialogProject = true">
          <v-btn icon>
            <v-icon>add</v-icon>
          </v-btn>
          <span class="body-2">Add project</span>
        </div>
        <div v-if="projects.length == 0" class="text-center">
          <p>No projects added</p>
        </div>
        <div class="mb-4" v-else v-for="project in projects" :key="project._id">
          <div class="d-flex justify-space-between">
            <div v-if="editedProject == project._id">
              <v-text-field
                label="Edit project name"
                v-model="projectName"
              ></v-text-field>
              <v-btn @click="editProject(project._id)">Save</v-btn>
            </div>
            <div v-else>
              <v-icon :color="project.color" class="mr-4">
                fiber_manual_record
              </v-icon>
              <span class="caption" @click="projectId = project._id">{{ project.name }}</span>
            </div>
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-icon v-on="on">
                  more_vert
                </v-icon>
              </template>
              <v-list>
                <v-list-item>
                  <v-list-item-title class="body-2" @click="editedProject = project._id">
                    <v-icon class="mr-2">create</v-icon> Edit
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title class="body-2" @click="deleteProject(project._id)">
                    <v-icon class="mr-2">delete</v-icon> Delete
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="9">
        <v-text-field
          label="Search tasks"
          filled
          v-model="search"
        ></v-text-field>
        <div class="d-flex justify-space-between align-center mb-4">
          <span>Tasks</span>
          <v-btn class="primary" @click="dialogTask = true">
            <v-icon class="mr-2">add</v-icon>
              Add task
          </v-btn>
        </div>
        <div class="text-center pt-4" v-if="getTasks.length == 0">
          <p class="headline">No tasks left!</p>
        </div>
        <v-simple-table class="mb-8 pt-4 elevation-1 rounded" v-else>
            <template v-slot:default>
              <thead>
                  <tr>
                    <th class="text-left">Complete</th>
                    <th class="text-left">Name</th>
                    <th class="text-left">Due date</th>
                    <th class="text-left">Priority</th>
                    <th class="text-left">Action</th>
                  </tr>
              </thead>
              <tbody>
                  <tr class="mt-2" v-for="task in filterTasks" :key="task._id">
                    <td>
                      <v-btn icon class="check-icon" @click="deleteTask(task._id)">
                        <v-icon>check_circle_outline</v-icon>
                      </v-btn>
                    </td>
                    <div v-if="editedTask == task._id" >
                      <v-text-field type="text" label="Edit task name" v-model="taskName"></v-text-field>
                      <v-btn @click="editTask(task._id)">Save</v-btn>
                    </div>
                    <td v-else>{{ task.name }}</td>
                    <td v-if="task.dueDate">{{ task.dueDate }}</td>
                    <td v-else>-</td>
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
                    <td v-else>
                      -
                    </td>
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
import Breadcrumbs from '@/components/Breadcrumbs'
import ColorPicker from '@/components/ColorPicker'

export default {
  name: 'Todo',
  components: {
    Breadcrumbs,
    ColorPicker
  },
  data () {
    return {
      editedTask: null,
      dialogTask: false,
      dialogProject: false,
      picker: new Date().toISOString().substr(0, 10),
      menu: false,
      projects: [],
      projectName: '',
      taskName: '',
      selectedProject: null,
      editedProject: null,
      colorPicker: false,
      color: '',
      date: '',
      search: '',
      priorities: [
        {
          name: 'Priority 1',
          color: 'red'
        },
        {
          name: 'Priority 2',
          color: 'orange'
        },
        {
          name: 'Priority 3',
          color: 'green'
        }
      ],
      selectedPriority: null,
      projectId: null
    }
  },
  methods: {
    fetchTasks () {
      this.$store.dispatch('fetchTasks')
    },
    addTask () {
      this.$store.dispatch('addTask', {
        name: this.taskName,
        project: this.selectedProject,
        dueDate: this.date,
        priority: this.selectedPriority
      }).then(() => {
        this.taskName = ''
        this.selectedProject = ''
        this.date = ''
      }).catch(err => console.log(err))
    },
    deleteTask (taskId) {
      this.$store.dispatch('deleteTask', taskId)
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
    },
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
          name: this.projectName,
          color: this.color
        })
        this.projects.push(newProject.data)
      } catch (error) {
        console.log(error)
      }
    },
    async deleteProject (id) {
      try {
        await axios.delete(`http://localhost:3000/projects/${id}/delete`)
        this.getProjects()
      } catch (error) {
        console.log(error)
      }
    },
    async editProject (id) {
      try {
        await axios.patch(`http://localhost:3000/projects/${id}/edit`, {
          name: this.projectName
        })
        this.editedProject = null
        this.projectName = ''
        this.getProjects()
      } catch (error) {
        console.log(error)
      }
    },
    changeColor (color) {
      this.color = color
    }
  },
  computed: {
    filterTasks () {
      return this.getTasks.filter(tasks => {
        if (this.projectId === null) {
          return tasks.name.toLowerCase().match(this.search)
        }
        return tasks.name.toLowerCase().match(this.search) && tasks.project === this.projectId
      })
    },
    getTasks () {
      return this.$store.getters.getTasks
    }
  },
  mounted () {
    this.getProjects()
    this.fetchTasks()
  }
}
</script>

<style>
  .check-icon::before,
  .check-icon:hover {
    color: green;
  }
</style>
