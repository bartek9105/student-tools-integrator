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
                    <v-toolbar-title>Create new class event</v-toolbar-title>
                </v-toolbar>
                <v-tabs>
                    <v-tab>
                        Create one time class
                    </v-tab>
                    <v-tab>
                        Create recurring class
                    </v-tab>
                    <v-tab-item>
                        <v-card flat>
                        <v-card-text>
                            <v-container>
                                <v-form @submit.prevent="addEvent">
                                    <v-select
                                        return-object
                                        :items="getSubjects"
                                        label="Select class"
                                        item-text="name"
                                        solo
                                        v-model="eventDetails.selectedClass"
                                    ></v-select>
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
                                    <v-form @submit.prevent="addEvent">
                                        <v-select
                                            return-object
                                            :items="getSubjects"
                                            label="Select class"
                                            item-text="name"
                                            solo
                                            v-model="eventDetails.selectedClass"
                                        ></v-select>
                                        <DatePicker v-on:pickDate="pickStartDate($event)"/>
                                        <DatePicker v-on:pickDate="pickEndDate($event)"/>
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
        title: '',
        start: null,
        end: null,
        startTime: null,
        endTime: null,
        startRecur: null,
        endRecur: null,
        daysOfWeek: null,
        selectedClass: null,
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
    addEvent () {
      this.$store.dispatch('addEvent', {
        title: this.eventDetails.selectedClass.name,
        start: this.eventDetails.start,
        end: this.eventDetails.end,
        startTime: this.eventDetails.startTime,
        endTime: this.eventDetails.endTime,
        subject: this.eventDetails.selectedClass._id,
        daysOfWeek: this.eventDetails.daysOfWeek,
        startRecurence: this.eventDetails.startRecur,
        endRecurence: this.eventDetails.endRecur
      })
      this.closeDialog()
      this.eventDetails = {
        title: '',
        start: null,
        end: null,
        startTime: null,
        endTime: null,
        startRecur: null,
        endRecur: null,
        daysOfWeek: null
      }
    },
    pickStartDate (start) {
      this.eventDetails.startRecur = start
    },
    pickEndDate (end) {
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
    closeDialog () {
      this.$emit('input')
    }
  },
  computed: {
    getSubjects () {
      return this.$store.getters.getSubjects
    }
  }
}
</script>

<style>

</style>
