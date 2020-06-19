<template>
  <v-color-picker class="ma-2 mx-0 mb-8" :swatches="swatches" v-model="color" @input="changeColor" show-swatches hide-inputs hide-canvas></v-color-picker>
</template>

<script>
export default {
  name: 'ColorPicker',
  data () {
    return {
      swatches: [
        ['#FF0000', '#AA0000', '#550000'],
        ['#FFFF00', '#AAAA00', '#555500'],
        ['#00FF00', '#00AA00', '#005500'],
        ['#00FFFF', '#00AAAA', '#005555'],
        ['#0000FF', '#0000AA', '#000055']
      ],
      color: ''
    }
  },
  methods: {
    changeColor () {
      this.$emit('changeColor', this.color)
    }
  }
}
</script>

<style>

</style>
