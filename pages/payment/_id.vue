<template lang="pug">
div
  N-link.button.button-outline(
    to="/payment"
  ) Назад
  h2 payment {{$route.params}}
  pre {{$data}}
</template>

<script>
export default {
  validate({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id);
  },
  async asyncData({ app, params }) {
    const data = await app.$axios.$get(`/payment/${params.id}`);
    return { res: data };
  }
};
</script>

<style>
</style>