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
          <v-form>
            <v-text-field type="text" label="Project name"></v-text-field>
            <v-btn type="submit" color="primary" class="mr-4" @click.stop="dialogProject = false">
              Create project
            </v-btn>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogTask" max-width="500">
      <v-card>
        <v-container>
          <v-form>
            <v-text-field type="text" label="Task"></v-text-field>
            <v-select
              :items="items"
              label="Select project"
              solo
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
            <v-btn type="submit" color="primary" class="mr-4" @click.stop="dialogTask = false">
              Create task
            </v-btn>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
    <v-row>
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
        <div class="d-flex pl-6 mb-4">
          <div>
            <v-icon color="red" class="mr-4">
              fiber_manual_record
            </v-icon>
            <span class="caption">Sport</span>
          </div>
        </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="9">
        <v-text-field
          label="Search"
          filled
        ></v-text-field>
        <v-simple-table class="mb-8 pt-4 elevation-1 rounded">
          <template v-slot:default>
            <thead>
              <span class="pt-6 pl-4 mb-4">Tasks</span>
              <tr>
                <th class="text-left">Done</th>
                <th class="text-left">Name</th>
                <th class="text-left">Date</th>
                <th class="text-left">Status</th>
                <th class="text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr class="mt-2">
                <td>
                  <v-icon>
                    check_circle_outline
                  </v-icon>
                </td>
                <td>abc</td>
                <td>abc</td>
                <td>
                  <v-chip
                    class="white--text"
                    small
                    color="green"
                  >
                    small chip
                  </v-chip>
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
        <v-simple-table class=" pt-4 elevation-1">
          <template v-slot:default>
            <thead>
              <span class="pt-6 pl-4">Completed</span>
              <tr>
                <th class="text-left">Done</th>
                <th class="text-left">Name</th>
                <th class="text-left">Date</th>
                <th class="text-left">Status</th>
                <th class="text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr class="mt-2">
                <td>
                  <v-icon>
                    check_circle_outline
                  </v-icon>
                </td>
                <td>abc</td>
                <td>abc</td>
                <td>
                  <v-chip
                    class="white--text"
                    small
                    color="green"
                  >
                    small chip
                  </v-chip>
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
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      picker: new Date().toISOString().substr(0, 10),
      menu: false
    }
  }
}
</script>

<style>

</style>
