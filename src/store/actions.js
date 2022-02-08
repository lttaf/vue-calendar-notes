import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

export default {
  async createUser ({ commit }, { email, password }) {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    const userId = firebase.auth().currentUser.uid
    const calendarId = firebase.database().ref('calendars').push().key
    const user = {
      name: email,
      calendars: {},
      friends: {},
      personalCalendar: calendarId
    }
    const calendar = {
      name: 'My calendar'
    }
    const updates = {}
    updates[`calendars/${calendarId}`] = calendar
    updates[`users/${userId}`] = user
    firebase.database().ref().update(updates)
      .then(() => {
        commit('setAuthUser', userId)
        commit('setItem', { id: calendarId, item: calendar, resource: 'calendars' })
        commit('setItem', { id: userId, item: user, resource: 'users' })
        return Promise.resolve()
    })
  },
  async loginUser ({ commit }, {email, password}) {
    const data = await firebase.auth().signInWithEmailAndPassword(email, password)
    const userId = data.user.uid
    console.log(data)
    commit('setAuthUser', userId)

  },
  createCalendar({ commit, state }, calendar) {
    const calendarId = firebase.database().ref('calendars').push().key
    const userIds = Object.values(calendar.memberIds)
    const updates = {}
    updates[`calendars/${calendarId}`] = calendar
    userIds.forEach(userId => updates[`users/${userId}/calendars/${calendarId}`] = calendarId)
    firebase.database().ref().update(updates)
      .then(() => {
        commit('setItem', { id: calendarId, item: calendar, resource: 'calendars' })
        userIds.forEach(userId => commit('appendCalendarToUser', { calendarId, userId }))
        return Promise.resolve(state.calendars[calendarId])
      })
  },
  deleteCalendar({ commit, getters, dispatch }, calendarId) {
    const updates = {}
    updates[`calendars/${calendarId}`] = null
    firebase.database().ref().update(updates)
      .then(() => {
        commit('deleteCalendar', calendarId)
        return Promise.resolve()
    })
    const noteIds = getters.noteIdsByCalendar(calendarId)
    dispatch('deleteNotes', noteIds)
  },
  deleteCalendarFromUser({ commit, state }, calendarId) {
    const userId = state.authId
    const updates = {}
    updates[`users/${userId}/calendars/${calendarId}`] = null
    firebase.database().ref().update(updates)
      .then(() => {
        commit('deleteCalendarFromUser', { calendarId, userId })
        return Promise.resolve()
    })
  },
  createNote({ commit, state }, { note }) {
    const noteId = firebase.database().ref('notes').push().key
    const updates = {}
    console.log(note)
    updates[`notes/${noteId}`] = note
    firebase.database().ref().update(updates)
      .then(() => {
        commit('setItem', { id: noteId, item: note, resource: 'notes' })
        return Promise.resolve(state.notes[noteId])
      })
  },
  updateNote({ state, commit }, { id, description, isComplete }) {
    return new Promise((resolve) => {
      const note = state.notes[id]
      const updates = { description, isComplete }
      firebase.database().ref('notes').child(id).update(updates)
        .then(() => {
          commit('setNote', { noteId: id, note: {...note, description, isComplete } })
          resolve(note)
        })
    })
  },
  deleteNote({ commit }, { noteId }) {
    const updates = {}
    updates[`notes/${noteId}`] = null
    firebase.database().ref().update(updates)
      .then(() => {
        commit('deleteNote', noteId)
        return Promise.resolve()
    })
  },
  deleteNotes({ commit }, noteIds) {
    const ids = Array.isArray(noteIds) ? noteIds : Object.keys(noteIds)
    const updates = {}
    ids.forEach(id => {
      updates[`notes/${id}`] = null
    }) 
    firebase.database().ref().update(updates)
      .then(() => {
        ids.forEach(id => {
          commit('deleteNote', id)
        })
        return Promise.resolve()
    })
  },
  fetchUser: ({dispatch}, id) => dispatch('fetchItem', {resource: 'users', id}),
  fetchCalendar: ({dispatch}, id) => dispatch('fetchItem', {resource: 'calendars', id}),
  fetchCalendars: ({dispatch}, ids) => dispatch('fetchItems', {resource: 'calendars', ids}),
  fetchItem  ({ state, commit }, {id, resource}) {
    return new Promise((resolve) => {
      firebase.database().ref(resource).child(id).once('value', snapshot => {
        commit('setItem', { id: snapshot.key, item: snapshot.val(), resource })
        resolve(state[resource][id])
      })
    })
  },
  fetchItems ({ dispatch }, {ids, resource}) {
    ids = Array.isArray(ids) ? ids : Object.keys(ids)
    return Promise.all(ids.map(id => dispatch('fetchItem', {id, resource})))
  },
  fetchAllUsers ({state, commit}) {
    return new Promise((resolve) => {
      firebase.database().ref('users').once('value', snapshot => {
        const usersObject = snapshot.val()
        Object.keys(usersObject).forEach(userId => {
          const user = usersObject[userId]
          commit('setItem', {resource: 'users', id: userId, item: user})
        })
        resolve(Object.values(state.users))
      })
    })
  },
  fetchAllCalendars ({state, commit}) {
    return new Promise((resolve) => {
      firebase.database().ref('calendars').once('value', snapshot => {
        const calendarsObject = snapshot.val()
        Object.keys(calendarsObject).forEach(calendarId => {
          const calendar = calendarsObject[calendarId]
          commit('setItem', {resource: 'calendars', id: calendarId, item: calendar})
        })
        resolve(Object.values(state.calendars))
      })
    })
  },
  fetchAllNotes ({state, commit}) {
    return new Promise((resolve) => {
      firebase.database().ref('notes').once('value', snapshot => {
        const notesObject = snapshot.val()
        Object.keys(notesObject).forEach(noteId => {
          const note = notesObject[noteId]
          commit('setItem', {resource: 'notes', id: noteId, item: note})
        })
        resolve(Object.values(state.notes))
      })
    })
  }
}