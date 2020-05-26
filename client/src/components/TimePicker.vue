<template>
    <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    :return-value.sync="time"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
    >
    <template v-slot:activator="{ on }">
        <v-text-field
        v-model="time"
        label="Pick time"
        prepend-icon="access_time"
        readonly
        v-on="on"
        ></v-text-field>
    </template>
    <v-time-picker
        v-if="menu"
        v-model="time"
        @input="pickTime"
        full-width
        @click:minute="$refs.menu.save(time)"
    ></v-time-picker>
    </v-menu>
</template>

<script>
export default {
  name: 'TimePicker',
  data () {
    return {
      time: null,
      menu: false
    }
  },
  methods: {
    pickTime () {
      this.$emit('pickTime', this.time)
    }
  }
}
</script>
<style>

</style>
