<template>
    <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    :return-value.sync="date"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
    >
    <template v-slot:activator="{ on }">
        <v-text-field
        v-model="date"
        label="Pick time"
        prepend-icon="access_time"
        readonly
        v-on="on"
        ></v-text-field>
    </template>
    <v-time-picker
        v-if="menu"
        v-model="date"
        @input="pickTime"
        full-width
        @click:minute="$refs.menu.save(date)"
    ></v-time-picker>
    </v-menu>
</template>

<script>
export default {
  name: 'TimePicker',
  props: ['initTime'],
  data () {
    return {
      date: this.initTime,
      menu: false
    }
  },
  methods: {
    pickTime () {
      this.$emit('pickTime', this.date)
    }
  },
  watch: {
    initTime () {
      this.date = this.initTime
    }
  }
}
</script>
<style>

</style>
