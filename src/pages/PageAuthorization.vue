<template>
  <div class="centered">
    <div class="card border-success mb-3" style="max-width: 20rem">
      <div class="card-body">
        <h4 class="card-title">{{ isLoggingIn ? "Sign In" : "Register" }}</h4>
        <div style="margin-top: 10%">
          <template v-if="isLoggingIn">
            <SignIn />
          </template>
          <template v-else>
            <Register />
          </template>
        </div>
      </div>
      <div class="card-footer text-muted">
        <button
          @click.prevent="isLoggingIn = !isLoggingIn"
          type="button"
          class="btn btn-link btn-sm"
          style="text-decoration: none; outline: none; font-size: 1rem"
        >
          {{ isLoggingIn ? "Create a new account" : "Sign in my account" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SignIn from "@/components/SignIn";
import Register from "@/components/Register";

export default {
  components: {
    SignIn,
    Register,
  },
  data() {
    return {
      isLoggingIn: true,
    };
  },
};
</script>

<style scoped>
.centered {
  position: absolute;
  left: 50%;
  top: 50%;
  /* top: 70%; */
  transform: translate(-50%, -50%);
}
</style>