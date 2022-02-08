<template>
  <div>
    <!-- <a href="#" @click="newCalendar" class="list-group-item list-group-item-action"
        >NEW CALENDAR</a
      > -->
    <a
      href="#"
      @click="newCalendar"
      class="list-group-item list-group-item-action"
      >ADD NEW CALENDAR</a
    >
    <a
      href="#"
      @click="showCalendar(personalCalendar['.key'])"
      class="list-group-item list-group-item-action"
      >My calendar</a
    >
    <hr />
    <template v-for="c in calendars" :key="c['.key']">
      <div class="btn-group" style="width: 100%">
        <a
          href="#"
          @click="showCalendar(c['.key'])"
          class="list-group-item list-group-item-action"
          style="width: 80%"
          >{{ c.name }}</a
        >
        <button
          type="button"
          class="btn btn-outline-secondary"
          style="border-radius: 0px; border: none"
          @click="deleteCalendar(c['.key'])"
        >
          &#10005;
        </button>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    calendars: {
      type: Array,
    },
    personalCalendar: {
      type: Object,
    },
  },
  methods: {
    showCalendar(key) {
      this.$emit("show-calendar", key)
    },
    newCalendar() {
      this.$emit("new-calendar")
    },
    deleteCalendar(key) {
      this.$store.dispatch("deleteCalendarFromUser", key)
      const users = Object.values(this.$store.state.users).filter(user => user.calendars[key] === key)
      console.log(users)
      if (users.length < 2) this.$store.dispatch("deleteCalendar", key) // catches null and undefined, will be undefined if no users 
    },
  },
};
</script>

<style scoped>
</style>