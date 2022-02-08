export default {
  authUser (state) {
    return state.users[state.authId]
  },
  noteIdsByCalendar: (state) => (calendarId) => Object.values(state.notes).filter(note => note.calendarId === calendarId).map(note => note.key),
  userByName: (state) => (name) => Object.values(state.users).find((user) => user.name === name),
  usersByName: (state) => (name) => {
    const keyword = name.toLowerCase()
    return Object.values(state.users).filter(user => user.name.toLowerCase().includes(keyword))
  }
}