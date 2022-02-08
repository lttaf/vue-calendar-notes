import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from "firebase/app";
import 'dotenv/config'

const firebaseConfig = {

  // apiKey: "AIzaSyDpum6oAMBN7eNoBToPhtoZbhD5r299z6Y",
  apiKey: process.env.VUE_APP_API_KEY,

  authDomain: "vue-calendars.firebaseapp.com",

  projectId: "vue-calendars",

  storageBucket: "vue-calendars.appspot.com",

  messagingSenderId: "858216462956",

  // appId: "1:858216462956:web:f8f941a8a964bd6ddf3649",
  appId: process.env.VUE_APP_APP_ID,

  // databaseURL: "https://vue-calendars-default-rtdb.europe-west1.firebasedatabase.app"
  databaseURL: process.env.VUE_APP_DATABASE_URL

};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

createApp(App).use(router).use(store).mount('#app')
