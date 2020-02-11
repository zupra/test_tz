<template lang="pug">
div
  h1 HELLO
  pre {{$data}}
</template>

<script>
// import Logo from "~/components/Logo.vue";

export default {
  components: {
    // Logo
  },

  async asyncData({ app, store }) {
    // const data = await app.$axios.$get("/dog");
    const data = await app.$axios.$get("/trustee");
    return data; //{ dog: data };
  }
};
</script>

<style>
</style>
