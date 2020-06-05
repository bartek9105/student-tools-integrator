<template>
  <v-container>
    <div class="d-flex justify-space-between align-center">
      <Breadcrumbs/>
      <v-btn class="primary" @click="dialog = true">Add event</v-btn>
    </div>
    <FullCalendar
      defaultView="dayGridMonth"
      :plugins="plugins"
      :header="header"
      :events="getEvents"
      :eventTextColor="eventTextColor"
      :height="700"
      @eventClick="eventInfo"
    />
    <AddEventDialog v-model="dialog"/>
    <!-- Event dialog -->
    <div class="text-center">
      <v-dialog
        v-model="eventDialog"
        width="500"
        @input="v=>v||cleanCurrentEvent()"
      >
      <v-card v-if="currentEvent">
        <v-card-title
          class="headline primary"
        >
        <p class="white--text">{{ currentEvent.title }}</p>
        </v-card-title>

        <v-card-text class="pt-6">
          <div class="d-flex align-center">
            <v-icon class="mr-4">date_range</v-icon>
            <p class="mb-0 subtitle-1">
              <span class="font-weight-bold">From: </span> {{ currentEvent.start.toString().substr(0, 21) }}
              <span class="font-weight-bold">To: </span> {{ currentEvent.end.toString().substr(0, 21) }}
            </p>
          </div>
          <div class="d-flex align-center mt-4">
            <v-icon class="mr-4">description</v-icon>
            <p class="mb-0 subtitle-1" v-if="currentEvent.details">{{ currentEvent.details }}</p>
            <p class="mb-0 subtitle-1" v-else>No description</p>
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary">Edit</v-btn>
          <v-btn color="primary" @click="deleteEvent(currentEvent.id)">Delete</v-btn>
        </v-card-actions>
      </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>

<script>

import Breadcrumbs from '@/components/Breadcrumbs'
import AddEventDialog from '@/components/AddEventDialog'

import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'

export default {
  name: 'Calendar',
  components: {
    FullCalendar,
    Breadcrumbs,
    AddEventDialog
  },
  data () {
    return {
      plugins: [dayGridPlugin, timeGridPlugin],
      header: {
        left: 'today, prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      eventTextColor: '#fff',
      eventDialog: false,
      currentEvent: null,
      dialog: false
    }
  },
  methods: {
    deleteEvent (id) {
      this.$store.dispatch('deleteEvent', id).then(() => {
        this.fetchEvents()
        this.eventDialog = false
        this.$store.dispatch('showSnackbar', {
          snackbar: true,
          color: 'success',
          text: 'Event deleted'
        })
      }).catch(err => console.log(err))
    },
    eventInfo (arg) {
      this.eventDialog = true
      this.currentEvent = {
        id: arg.event.extendedProps._id,
        title: arg.event.title,
        start: arg.event.start,
        end: arg.event.end,
        details: arg.event.extendedProps.details
      }
    },
    cleanCurrentEvent () {
      this.currentEvent = null
    },
    fetchEvents () {
      this.$store.dispatch('getEvents')
    }
  },
  computed: {
    getEvents () {
      return this.$store.getters.eventsGetter
    }
  },
  mounted () {
    this.fetchEvents()
  }
}

</script>

<style lang="scss">
  @import '~@fullcalendar/core/main.css';
  @import '~@fullcalendar/daygrid/main.css';
  @import '~@fullcalendar/timegrid/main.css';
  .fc-button {
    display: flex;
    align-items: center;
    .fc-icon {
      vertical-align: baseline;
    }
  }
  .fc-left {
    display: flex;
  }

  @media screen and (max-width: 560px) {
    .fc-toolbar {
      flex-direction: column;
    }
    .fc-center {
      margin: 5px 0;
    }
  }
</style>
