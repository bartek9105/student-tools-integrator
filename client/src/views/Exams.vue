<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" class="px-0">
          <div class="d-flex justify-space-between align-center">
            <Breadcrumbs/>
            <v-btn color="primary ml-4">
              <v-icon class="mr-2">add</v-icon>
              Add exam
            </v-btn>
          </div>
      </v-col>
    </v-row>
    <v-simple-table class="elevation-1">
      <template v-slot:default>
        <thead>
          <tr class="pl-8">
            <th class="text-left">
              <v-icon class="mr-2">class</v-icon>
              Class
            </th>
            <th class="text-left">
              <v-icon class="mr-2">calendar_today</v-icon>
              Date
            </th>
            <th class="text-left">
              <v-icon class="mr-2">schedule</v-icon>
              Duration
            </th>
            <th class="text-left">
              <v-icon class="mr-2">person</v-icon>
              Teacher
            </th>
            <th class="text-left">
              <v-icon class="mr-2">room</v-icon>
              Room
            </th>
            <th class="text-left">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in desserts" :key="item.name">
            <td class="border" :style="{'border-left-color': color}">{{ item.name }}</td>
            <td>{{ item.calories }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.calories }}</td>
            <td>{{ item.name }}</td>
            <td>
              <v-icon class="mr-2">more_vert</v-icon>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs'

export default {
  name: 'Exams',
  components: {
    Breadcrumbs
  },
  data () {
    return {
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159
        },
        {
          name: 'Ice cream sandwich',
          calories: 237
        },
        {
          name: 'Eclair',
          calories: 262
        },
        {
          name: 'Cupcake',
          calories: 305
        },
        {
          name: 'Gingerbread',
          calories: 356
        },
        {
          name: 'Jelly bean',
          calories: 375
        },
        {
          name: 'Lollipop',
          calories: 392
        },
        {
          name: 'Honeycomb',
          calories: 408
        },
        {
          name: 'Donut',
          calories: 452
        },
        {
          name: 'KitKat',
          calories: 518
        }
      ],
      color: '#aea'
    }
  }
}
</script>

<style>
  tr {
    height: 70px;
  }
  .border {
    border-left: 3px solid #000;
  }
</style>
