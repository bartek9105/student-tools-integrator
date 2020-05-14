<template>
  <v-container>
    <UpcomingEvents/>
  </v-container>
</template>

<script>
import UpcomingEvents from '@/components/UpcomingEvents'

export default {
  name: 'Dashboard',
  components: {
    UpcomingEvents
  }
}
</script>
