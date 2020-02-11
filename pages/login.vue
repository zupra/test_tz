<template lang="pug">
form#login_form(
  @submit.prevent="logIn()"
)
  input.lg(
    name="username"
    autocomplete="on"
    placeholder="username"
    v-model="User.username"
  )
  input.lg(
    type="password"
    name="password"
    autocomplete="on"
    placeholder="password"
    v-model="User.password"
  )
  button(
    :disabled="Object.values(User).includes('')"
  ) Войти
</template>

<script>
export default {
  layout: "blank",
  data() {
    return {
      User: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    logIn() {
      this.$store.dispatch("user/login", this.User);
    }
  }
};
</script>

<style lang="stylus">
#login_form
  margin auto
  display flex
  flex-direction column

  input
    margin-bottom 1em
</style>
