<template>
  <v-container>
    <Breadcrumbs/>
      <v-row>
        <v-col cols="12" md="4">
          <v-card
            class="mx-auto"
            max-width="300"
            tile
          >
            <v-text-field
              label="Add project"
              required
            ></v-text-field>
          <v-expansion-panels>
            <v-expansion-panel
              v-for="(item,i) in 5"
              :key="i"
            >
              <v-expansion-panel-header>Item</v-expansion-panel-header>
              <v-expansion-panel-content>
                abc
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          </v-card>
        </v-col>
        <v-col cols="12" md="8">
          <div class="d-flex">
            <v-text-field
              label="Add task"
              required
            ></v-text-field>
            <v-btn color="primary">Add task</v-btn>
          </div>
          <v-text-field
            label="Search"
            filled
          ></v-text-field>
          <v-simple-table class="mb-8 elevation-1">
            <template v-slot:default>
              <thead>
                <span class="pt-6 pl-4">Tasks</span>
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
                          <v-list-item-title>Edit</v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-title>Delete</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </td>
                </tr>
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
                          <v-list-item-title>Edit</v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-title>Delete</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </td>
                </tr>
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
                          <v-list-item-title>Edit</v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-title>Delete</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-simple-table class="elevation-1">
            <template v-slot:default>
              <thead>
                <span class="pt-6 pl-4">Tasks</span>
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
                          <v-list-item-title>Edit</v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-title>Delete</v-list-item-title>
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
          <Chart/>
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
  }
}
</script>

<style>

</style>
