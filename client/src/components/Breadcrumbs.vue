<template>
    <div>
      <v-breadcrumbs class="pl-2 title route-title">{{ this.$route.name }}</v-breadcrumbs>
    </div>
</template>

<script>

export default {
  name: 'Breadcrumbs'
}
</script>

<style>
  .route-title {
    text-transform: uppercase;
  }
</style>
