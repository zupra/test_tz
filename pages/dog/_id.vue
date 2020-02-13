<template lang="pug">
div
  N-link.button.button-outline(
    to="/dog"
  ) Назад
  h2 dog {{$route.params}}
  pre {{$data}}
</template>

<script>
export default {
  validate({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id);
  },
  async asyncData({ app, params }) {
    const data = await app.$axios.$get(`/dog/${params.id}`);
    return { res: data };
  }
};
</script>

<style>
</style>