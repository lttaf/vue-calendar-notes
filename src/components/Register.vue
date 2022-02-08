<template>
  <div>
    <!-- <div class="card border-success mb-3" style="max-width: 20rem">
      <div class="card-body">
        <h4 class="card-title">Register</h4> -->
        <form @submit.prevent="register">
          <div class="form-group">
            <div class="form-floating" style="margin-bottom: 5%">
              <input
                v-model="email"
                type="email"
                class="form-control"
                id="floatingInput"
                placeholder="name@example.com"
              />
              <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating">
              <input
                v-model="password"
                type="password"
                class="form-control"
                id="floatingPassword"
                placeholder="Password"
              />
              <label for="floatingPassword">Password</label>
            </div>
          </div>

          <div class="d-grid gap-2">
            <button
              type="submit"
              class="btn btn-primary"
              style="margin-top: 10%"
            >
              Submit
            </button>
          </div>
        </form>
      <!-- </div>
    </div> -->
  </div>
</template>

<script>
// import firebase from 'firebase'

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    register() {
      // firebase
      // .auth() // get the auth api
      // .createUserWithEmailAndPassword(this.email, this.password)
      // .then((data) => {
      //   console.log('Successfully registered!', data);
      //   this.$router.push({ name: 'Home' })
      // })
      // .catch(error => {
      //   console.log(error.code)
      //   alert(error.message);
      // });
      this.$store.dispatch('createUser', { email: this.email, password: this.password }).then(() => this.$router.push({ name: 'Home' }))
    }
  }
};
</script>

<style>
</style>