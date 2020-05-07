<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="10"
        >
          <v-text-field
            v-model="firstname"
            :rules="nameRules"
            label="Subject name"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2">
          <v-btn small color="primary">Add</v-btn>
        </v-col>
      </v-row>
      <v-card
        class="mx-auto"
        tile
      >
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Economics</td>
            </tr>
            <tr>
              <td>Machine learning</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      </v-card>
    </v-container>
  </v-form>
</template>

<script>


export default {
  data () {
    return {
    }
  }
}
</script>

<style>

</style>
