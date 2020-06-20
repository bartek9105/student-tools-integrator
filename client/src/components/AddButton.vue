<template>
  <v-tooltip left>
    <template v-slot:activator="{ on }">
      <v-btn @click="handleClick" class="mx-2" fab dark color="primary" v-on="on">
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </template>
    <span>
      <slot></slot>
    </span>
  </v-tooltip>
</template>

<script>
export default {
  name: 'AddButton',
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>

<style>

</style>
