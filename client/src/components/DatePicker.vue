<template>
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
        label="Pick date"
        prepend-icon="event"
        readonly
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="date" @input="pickDate" no-title scrollable>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
      <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: 'DatePicker',
  props: ['initDate'],
  data () {
    return {
      date: this.initDate,
      menu: false
    }
  },
  methods: {
    pickDate () {
      this.$emit('pickDate', this.date)
    }
  },
  watch: {
    initDate () {
      this.date = this.initDate
    }
  }
}
</script>

<style>

</style>
