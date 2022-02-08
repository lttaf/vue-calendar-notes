// import Vue from 'vue'
// import Vuex from 'vuex'
import { createStore } from "vuex";
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

// Vue.use(Vuex)


// export default new Vuex.Store({
  export default createStore({
    state: {
      calendars: {
        'ettyuhvcxzt': {
          key: 'ettyuhvcxzt',
          name: 'Lol',
          members: {
            jUjmgCurRRdzayqbRMO7aTG9X1G2: 'jUjmgCurRRdzayqbRMO7aTG9X1G2',
            e45dfgu6y8: 'e45dfgu6y8',
            fyub567iufdt: 'fyub567iufdt',
            bduihbv65fh: 'bduihbv65fh'
          }
        },
        'hgtcxuhu7659gdr': {
          key: 'hgtcxuhu7659gdr',
          name: 'MY CALENDAR',
          notes: {},
          members: {
            jUjmgCurRRdzayqbRMO7aTG9X1G2: 'jUjmgCurRRdzayqbRMO7aTG9X1G2'
          }
        }
      },
      notes: {
        'fjervhoqer94': {
          calendarId: 'ettyuhvcxzt',
          description: "Take Noah to basketball practice.",
          isComplete: false,
          dates: '2022-02-04T21:00:00.000Z',
          color: "red",
          key: 'fjervhoqer94'
        }
      },
      users: {
        'jUjmgCurRRdzayqbRMO7aTG9X1G2': {
          key: 'jUjmgCurRRdzayqbRMO7aTG9X1G2',
          name: 'Chel',
          friends: {
            fyub567iufdt: 'fyub567iufdt',
            bduihbv65fh: 'bduihbv65fh'
          },
          personalCalendar: 'hgtcxuhu7659gdr',
          calendars: {
            ettyuhvcxzt: 'ettyuhvcxzt'
          }
        }
      },
      // calendars: {},
      // notes: {},
      // users: {},
      authId: ''
    },
    getters,
    actions,
    mutations
  })