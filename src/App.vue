<template>
  <div>
    <TheNavBar v-if="$route.name !== 'Login'" />
    <router-view />
  </div>
</template>

<script>
import TheNavBar from "@/components/TheNavBar";

export default {
  name: "App",
  components: {
    TheNavBar
  }
};
</script>

<style src='../node_modules/bootswatch/dist/quartz/bootstrap.min.css'>
</style>
