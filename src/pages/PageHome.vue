<template>
  <div v-if="asyncDataStatus_ready">
    <CalendarCard :calendarId="calendarId" />
    <!-- <CalendarTest /> -->
  </div>
</template>

<script>
import CalendarCard from '@/components/CalendarCard'
import asyncDataStatus from '@/mixins/AsyncDataStatus'

export default {
  components: {
    CalendarCard
  },
  mixins: [asyncDataStatus],
  computed: {
    calendarId () {
      const id = this.$store.state.authId;
      return this.$store.state.users[id].personalCalendar
    }
  },
  beforeCreate () {
    this.$store.dispatch('fetchAllNotes')
      .then(() => this.$store.dispatch('fetchAllCalendars'))
      .then(() => this.$store.dispatch('fetchAllUsers'))
      .then(() => {
        this.asyncDataStatus_fetched()
      })
  }
}
</script>

<style scoped>

</style>