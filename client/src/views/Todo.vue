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
              <v-text-field type="text" label="Project name" v-model="project.projectName"></v-text-field>
              <v-icon @click="colorPicker = !colorPicker">palette</v-icon>
            </div>
            <ColorPicker class="mb-8 ml-0" v-if="colorPicker" v-model="project.color" v-on:changeColor="changeColor($event)"/>
            <v-btn type="submit" color="primary" class="mr-4" @click="addProject" @click.stop="dialogProject = false">
              Create project
            </v-btn>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
    <!-- Edit project dialog -->
    <v-dialog v-model="dialogEditProject" max-width="500">
      <v-card>
        <v-container>
          <v-form @submit.prevent>
            <div class="d-flex">
              <v-text-field type="text" label="Project name" v-if="currentProject" v-model="currentProject.name"></v-text-field>
              <v-icon @click="colorPicker = !colorPicker">palette</v-icon>
            </div>
            <ColorPicker class="mb-8 ml-0" v-if="colorPicker" v-model="currentProject.color" v-on:changeColor="changeProjectColor($event)"/>
            <v-btn type="submit" color="primary" class="mr-4" @click="editProject(currentProject)" @click.stop="dialogEditProject = false">
              Edit project
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
              :items="getProjects"
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
    <!-- Edit task dialog -->
    <v-dialog v-model="dialogEditTask" max-width="500">
      <v-card>
        <v-container>
          <v-form @submit.prevent>
            <v-text-field type="text" label="Task" v-if="currentTask" v-model="currentTask.name"></v-text-field>
            <v-select
              :items="getProjects"
              label="Select project"
              item-text="name"
              item-value="_id"
              solo
              v-if="currentTask"
              v-model="currentTask.project"
            ></v-select>
            <v-select
              :items="priorities"
              label="Select priority"
              item-text="name"
              item-value="color"
              return-object
              solo
              v-if="currentTask"
              v-model="currentTask.priority"
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
                v-if="currentTask"
                v-model="currentTask.dueDate"
                label="Due date"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-if="currentTask" v-model="currentTask.dueDate" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
            </v-date-picker>
            </v-menu>
            <v-btn type="submit" color="primary" class="mr-4" @click="editTask(currentTask)" @click.stop="dialogEditTask = false">
              Edit task
            </v-btn>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
    <v-row>
      <v-col cols="12" sm="12" md="12" lg="3">
        <v-card
          class="px-4 py-6"
          tile
        >
        <div class="d-flex align-center mb-4" @click="dialogProject = true">
          <v-btn text>
            <v-icon class="mr-2">add</v-icon>
            <span class="body-2">Add project</span>
          </v-btn>
        </div>
        <div v-if="getProjects.length == 0" class="text-center">
          <p>No projects added</p>
        </div>
        <div class="mb-4" v-else v-for="project in getProjects" :key="project._id">
          <div class="d-flex justify-space-between">
            <v-btn text>
              <v-icon :color="project.color" class="mr-4">
                fiber_manual_record
              </v-icon>
              <span class="caption" @click="projectId = project._id">{{ project.name }}</span>
            </v-btn>
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-icon v-on="on">
                  more_vert
                </v-icon>
              </template>
              <v-list>
                <v-list-item>
                  <v-list-item-title class="body-2" @click="updateEditProjectDialog(project)">
                    <v-btn text>
                      <v-icon class="mr-2">create</v-icon> Edit
                    </v-btn>
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title class="body-2" @click="deleteProject(project._id)">
                    <v-btn text>
                      <v-icon class="mr-2">delete</v-icon> Delete
                    </v-btn>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="12" lg="9">
        <v-text-field
          label="Search tasks"
          filled
          v-model="search"
        ></v-text-field>
        <div class="d-flex justify-space-between align-center mb-4">
          <div class="d-flex align-center">
            <span class="mr-4">Tasks</span>
            <span class="caption display-all" @click="projectId = null">Display all tasks</span>
          </div>
          <v-tooltip left>
            <template v-slot:activator="{ on }">
              <v-btn class="mx-2" fab dark color="primary" v-on="on" @click="dialogTask = true">
                <v-icon dark>mdi-plus</v-icon>
              </v-btn>
            </template>
            <span>Add new task</span>
          </v-tooltip>
        </div>
        <div class="text-center pt-4" v-if="filterTasks.length == 0">
          <p class="headline">No tasks</p>
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
                    <td>{{ task.name }}</td>
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
                            <v-list-item-title class="body-2" @click="updateEditTaskDialog(task)">
                              <v-btn text>
                                <v-icon class="mr-2">create</v-icon> Edit
                              </v-btn>
                            </v-list-item-title>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-title class="body-2" @click="deleteTask(task._id)">
                              <v-btn text>
                                <v-icon class="mr-2">delete</v-icon> Delete
                              </v-btn>
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
      dialogTask: false,
      dialogEditTask: false,
      dialogEditProject: false,
      dialogProject: false,
      menu: false,
      taskName: null,
      selectedProject: null,
      colorPicker: false,
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
      projectId: null,
      project: {
        projectName: null,
        color: null
      },
      currentTask: null,
      currentProject: null
    }
  },
  methods: {
    fetchTasks () {
      this.$store.dispatch('fetchTasks')
    },
    addTask () {
      if (this.taskName !== null) {
        this.$store.dispatch('addTask', {
          name: this.taskName,
          project: this.selectedProject,
          dueDate: this.date,
          priority: this.selectedPriority
        }).then(() => {
          this.taskName = null
          this.selectedProject = null
          this.date = null
          this.selectedPriority = null
          this.$store.dispatch('showSnackbar', {
            snackbar: true,
            color: 'success',
            text: 'New task added'
          })
        }).catch(err => console.log(err))
      } else {
        this.$store.dispatch('showSnackbar', {
          snackbar: true,
          color: 'error',
          text: 'Task name cannot be empty'
        })
      }
    },
    editTask (currentTask) {
      this.$store.dispatch('editTask', currentTask).then(() => {
        this.$store.dispatch('showSnackbar', {
          snackbar: true,
          color: 'success',
          text: 'Task updated'
        })
      })
    },
    deleteTask (taskId) {
      this.$store.dispatch('deleteTask', taskId).then(() => {
        this.$store.dispatch('showSnackbar', {
          snackbar: true,
          color: 'success',
          text: 'Task deleted'
        })
      })
    },
    fetchProjects () {
      this.$store.dispatch('fetchProjects')
    },
    addProject () {
      this.$store.dispatch('addProject', this.project).then(() => {
        this.project.projectName = null
        this.project.color = null
      }).then(() => {
        this.$store.dispatch('showSnackbar', {
          snackbar: true,
          color: 'success',
          text: 'New project created'
        })
      })
    },
    editProject (currentProject) {
      this.$store.dispatch('editProject', currentProject).then(() => {
        this.$store.dispatch('showSnackbar', {
          snackbar: true,
          color: 'success',
          text: 'Project edited'
        })
      })
    },
    deleteProject (projectId) {
      this.$store.dispatch('deleteProject', projectId).then(() => {
        this.$store.dispatch('showSnackbar', {
          snackbar: true,
          color: 'success',
          text: 'Project deleted'
        })
      })
    },
    updateEditTaskDialog (task) {
      this.currentTask = task
      this.dialogEditTask = true
    },
    updateEditProjectDialog (project) {
      this.dialogEditProject = true
      this.currentProject = project
    },
    changeColor (color) {
      this.project.color = color
    },
    changeProjectColor (color) {
      this.currentProject.color = color
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
    },
    getProjects () {
      return this.$store.getters.getProjects
    }
  },
  mounted () {
    this.fetchTasks()
    this.fetchProjects()
  }
}
</script>

<style scoped>
  .check-icon::before,
  .check-icon:hover {
    color: green;
  }
  .display-all:hover {
    cursor: pointer
  }
  td:not(:first-child) {
    padding-top: 25px;
    padding-bottom: 25px;
  }
</style>
