<template>
  <v-container>
    <Breadcrumbs/>
      <v-row>
        <v-col cols="12" md="8">
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th class="text-left">Calories</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>abc</td>
                  <td>abc</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
        <v-col cols="12" md="4">
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
