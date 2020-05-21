<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <UpcomingEvents/>
      </v-col>
    </v-row>
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
