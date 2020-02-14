<template lang="pug">
#layout
  #topNav.flex.y_center.x_sb
    N-link(
      to="/"
    ) Home
    div
      N-link.button.button-outline.mx-2(
        v-for="link in ['dog', 'trustee', 'payment']"
        :to="`/${link}`"
      ) {{link}}

    .button.button-clear(
      @click="logout"
    ) logout
  <nuxt />
</template>

<script>
export default {
  middleware: ["user"],
  methods: {
    logout() {
      this.$store.commit("user/LOGOUT");
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="stylus">
#layout
  padding-top 60px

#topNav
  padding .5rem 1rem 0
  position fixed
  background #f4f5f6
  border-bottom .1rem solid #d1d1d1
  left 0
  top 0
  width 100%
  z-index 10

#page
  margin 1em
</style>
