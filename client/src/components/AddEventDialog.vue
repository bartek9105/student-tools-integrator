<template>
    <v-dialog
      :value="value" @input="$emit('input')"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
    <template>
      <v-card>
        <v-toolbar flat color="primary" dark>
          <v-icon class="mr-4" @click.native="closeDialog">close</v-icon>
          <v-toolbar-title>Create new event</v-toolbar-title>
        </v-toolbar>
        <v-tabs>
          <v-tab>Create event</v-tab>
          <v-tab>Create recurring event</v-tab>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <v-container>
                  <v-form @submit.prevent="addSingleEvent">
                    <v-text-field v-model="eventDetails.title" type="text" label="Event name"></v-text-field>
                    <v-text-field v-model="eventDetails.details" type="text" label="Event details (optional)"></v-text-field>
                    <DatePicker v-on:pickDate="pickStart($event)"/>
                    <DatePicker v-on:pickDate="pickEnd($event)"/>
                    <div class="d-flex justify-space-between my-2">
                      <div>
                        Start time
                        <TimePicker v-on:pickTime="pickStartTime($event)"/>
                      </div>
                      <div>
                        End time
                        <TimePicker v-on:pickTime="pickEndTime($event)"/>
                      </div>
                    </div>
                    <v-btn type="submit" color="primary" class="mr-4">
                      Create event
                    </v-btn>
                  </v-form>
                </v-container>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <v-container>
                  <v-form @submit.prevent="addRecurringEvent">
                    <v-text-field v-model="eventDetails.title" type="text" label="Event name"></v-text-field>
                    <DatePicker v-on:pickDate="pickStartDateRecur($event)"/>
                    <DatePicker v-on:pickDate="pickEndDateRecur($event)"/>
                    <div class="d-flex justify-space-between my-2">
                      <div>
                        Start time
                        <TimePicker v-on:pickTime="pickStartTimeRecur($event)"/>
                      </div>
                      <div>
                        End time
                        <TimePicker v-on:pickTime="pickEndTimeRecur($event)"/>
                      </div>
                    </div>
                    <v-select
                        :items="days"
                        item-text="dayName"
                        item-value="id"
                        v-model="eventDetails.daysOfWeek"
                        label="Repeat every"
                        solo
                    ></v-select>
                    <v-btn type="submit" color="primary" class="mr-4">
                      Create event
                    </v-btn>
                  </v-form>
                </v-container>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </template>
    </v-dialog>
</template>

<script>
import DatePicker from '@/components/DatePicker'
import TimePicker from '@/components/TimePicker'

export default {
  data () {
    return {
      eventDetails: {
        title: null,
        start: null,
        end: null,
        startTime: null,
        endTime: null,
        startTimeRecur: null,
        endTimeRecur: null,
        startRecur: null,
        endRecur: null,
        daysOfWeek: null,
        details: null,
        dialogMutable: this.dialog
      },
      days: [
        {
          id: 0,
          dayName: 'Sunday'
        },
        {
          id: 1,
          dayName: 'Monday'
        },
        {
          id: 2,
          dayName: 'Tuesday'
        },
        {
          id: 3,
          dayName: 'Wednesday'
        },
        {
          id: 4,
          dayName: 'Thursday'
        },
        {
          id: 5,
          dayName: 'Friday'
        },
        {
          id: 6,
          dayName: 'Saturday'
        }
      ]
    }
  },
  props: ['value'],
  components: {
    DatePicker,
    TimePicker
  },
  methods: {
    addSingleEvent () {
      if (this.eventDetails.startTime !== null && this.eventDetails.endTime !== null && this.eventDetails.start !== null && this.eventDetails.end !== null && this.eventDetails.title !== null) {
        this.$store.dispatch('addEvent', {
          title: this.eventDetails.title,
          start: this.eventDetails.start + `T${this.eventDetails.startTime}`,
          end: this.eventDetails.end + `T${this.eventDetails.endTime}`,
          details: this.eventDetails.details,
          daysOfWeek: null
        }).then(() => {
          this.closeDialog()
          this.eventDetails = {
            title: null,
            start: null,
            end: null,
            startTime: null,
            endTime: null,
            details: null
          }
          this.$store.dispatch('showSnackbar', {
            snackbar: true,
            color: 'success',
            text: 'New event created'
          })
        })
      }
      this.$store.dispatch('showSnackbar', {
        snackbar: true,
        color: 'error',
        text: 'Fill in all fields'
      })
    },
    addRecurringEvent () {
      if (this.eventDetails.title !== null && this.eventDetails.startRecur !== null && this.eventDetails.endRecur !== null) {
        this.$store.dispatch('addEvent', {
          title: this.eventDetails.title,
          startRecurence: this.eventDetails.startRecur,
          endRecurence: this.eventDetails.endRecur,
          startTime: this.eventDetails.startTimeRecur,
          endTime: this.eventDetails.endTimeRecur,
          details: this.eventDetails.details,
          daysOfWeek: this.eventDetails.daysOfWeek
        }).then(() => {
          this.closeDialog()
          this.eventDetails = {
            title: null,
            start: null,
            end: null,
            startTime: null,
            endTime: null,
            details: null
          }
          this.$store.dispatch('showSnackbar', {
            snackbar: true,
            color: 'success',
            text: 'New event created'
          })
        })
      }
      this.$store.dispatch('showSnackbar', {
        snackbar: true,
        color: 'error',
        text: 'Fill in all fields'
      })
    },
    pickStartDateRecur (start) {
      this.eventDetails.startRecur = start
    },
    pickEndDateRecur (end) {
      this.eventDetails.endRecur = end
    },
    pickStart (start) {
      this.eventDetails.start = start
    },
    pickEnd (end) {
      this.eventDetails.end = end
    },
    pickStartTime (startTime) {
      this.eventDetails.startTime = startTime
    },
    pickEndTime (endTime) {
      this.eventDetails.endTime = endTime
    },
    pickStartTimeRecur (startTime) {
      this.eventDetails.startTimeRecur = startTime
    },
    pickEndTimeRecur (endTime) {
      this.eventDetails.endTimeRecur = endTime
    },
    closeDialog () {
      this.$emit('input')
    }
  }
}
</script>

<style>
  .v-slide-group__prev {
    display: none !important;
  }
</style>
