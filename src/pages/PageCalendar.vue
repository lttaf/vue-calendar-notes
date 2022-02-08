<template>
  <div>
    <div class="sidenav">
      <div style="margin-top: 20%">
        <CalendarList :calendars="calendars" :personalCalendar="personalCalendar" @show-calendar="showCalendar" @new-calendar="showForm" />
      </div>
    </div>
    <template v-if="isCalendar">
      <CalendarCard :calendarId="calendarId" />
    </template>
    <div v-else class="centered">
      <CalendarCreate />
    </div>
  </div>
</template>

<script>
import CalendarList from "@/components/CalendarList";
import CalendarCard from "@/components/CalendarCard";
import CalendarCreate from "@/components/CalendarCreate";

export default {
  components: {
    CalendarList,
    CalendarCard,
    CalendarCreate
  },
  data() {
    return {
      isCalendar: false,
      calendarId: ''
    }
  },
  computed: {
    user() {
      const id = this.$store.state.authId
      return this.$store.state.users[id]
    },
    personalCalendar () {
      return this.$store.state.calendars[this.user.personalCalendar]
    },
    calendars () {
      const calendarIds = this.user.calendars
      if (calendarIds == null) return []
      return Object.values(calendarIds).map(id => this.$store.state.calendars[id]) 
    }
  },
  methods: {
    showCalendar(key) {
      this.calendarId = key;
      this.isCalendar = true
    },
    showForm() {
      this.isCalendar = false
    }
  }
};
</script>

<style scoped>
.sidenav {
  height: 100vh;
  width: 20%;
  /* position: fixed; */
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
  box-shadow: inset 1px 1px rgba(255, 255, 255, 0.2),
    inset -1px -1px rgba(255, 255, 255, 0.1),
    1px 3px 24px -1px rgba(0, 0, 0, 0.15);
  background-color: transparent;
  background-image: linear-gradient(
    125deg,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.2) 70%
  );
}
.centered {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>