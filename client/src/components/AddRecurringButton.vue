<template>
    <v-tooltip left>
        <template v-slot:activator="{ on }">
        <v-btn class="mx-2" fab small dark color="primary" v-on="on" @click="handleClick">
            <v-icon dark>control_point_duplicate</v-icon>
        </v-btn>
        </template>
        <span>
            <slot></slot>
        </span>
    </v-tooltip>
</template>

<script>
export default {
  name: 'AddRecurringButton',
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>

<style>

</style>
