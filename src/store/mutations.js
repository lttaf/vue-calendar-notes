export default {
  setItem (state, { id, item, resource }) {
    // console.log(item)
    item['.key'] = id
    state[resource][id] = item 
  },
  setAuthUser (state, id) {
    state.authId = id
  },
  setUser (state, { user, userId }) {
    state.users[userId] = user
  },
  setCalendar (state, { calendarId, calendar }) {
    state.calendars[calendarId] = calendar
  },
  setNote (state, { noteId, note }) {
    state.notes[noteId] = note
  },
  deleteNote (state, noteId) {
    delete state.notes[noteId]
  },
  deleteCalendar (state, calendarId) {
    delete state.calendars[calendarId]
  },
  appendCalendarToUser (state, { calendarId, userId }) {
    console.log(calendarId, userId)
    state.users[userId].calendars[calendarId] = calendarId
  },
  deleteCalendarFromUser (state, { calendarId, userId }) {
    delete state.users[userId].calendars[calendarId]
  }
}