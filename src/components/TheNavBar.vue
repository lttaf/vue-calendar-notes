<template>
  <nav
    class="navbar navbar-expand-lg navbar-dark bg-dark"
    style="box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2)"
  >
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="{ name: 'Home' }"
        >Home</router-link
      >

      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link active" :to="{ name: 'Calendar' }"
              >Calendars
            </router-link>
          </li>
        </ul>
        <button
          @click="logOut"
          class="btn btn-link"
          style="text-decoration: none; outline: none"
        >
          LOGOUT &#10095;
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import firebase from "firebase/app";

export default {
  methods: {
    logOut() {
      firebase.auth().signOut();
      this.$router.push({ name: 'Login' });
    },
  }
};
</script>

<style scoped>
</style>