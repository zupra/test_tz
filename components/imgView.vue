<template lang="pug" functional>
.imgView
  img.imgView_full(
    :src="src"
  )
  img.imgView_pre(
    :src="src"
  )
</template>

<script>
export default {
  props: ["src"]
};
</script>

<style lang="stylus" scoped>
.imgView
  position relative
  cursor pointer

  &:hover
    .imgView_full
      display block

  &_full
    display none
    border 1em solid rgba(#000, .2)
    position absolute
    left -230px
    top 0
    width 300px

  &_pre
    max-height 2em
</style>