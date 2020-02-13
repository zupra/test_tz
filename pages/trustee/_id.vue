<template lang="pug">
div
  N-link.button.button-outline(
    to="/trustee"
  ) Назад
  h2 trustee {{$route.params}}
  pre {{$data}}
</template>

<script>
export default {
  validate({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id);
  },
  async asyncData({ app, params }) {
    const data = await app.$axios.$get(`/trustee/${params.id}`);
    return { res: data };
  }
};
</script>

<style>
</style>