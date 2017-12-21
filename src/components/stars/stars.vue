<template>
  <div class="stars">
    <span class="star-item" v-for="(item,index) in starClass"
      :key="index" :class="item"></span>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    props: {
      score: Number,
      size: Number
    },
    computed: {
      starClass () {
        const score = this.score
        const size = this.size
        const classes = []
        for(let i=0; i<Math.floor(score); i++) {
          classes.push(`star_${size} on`)
        }
        if(score-Math.floor(score) >= 0.5) {
          classes.push(`star_${size} half`)
        }
        while(classes.length<5) {
          classes.push(`star_${size} off`)
        }

        return classes
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .stars
    display flex
    justify-content space-between
    align-items center
    width 100%

    .star_24
      height 10px
      width 10px
      background-size 10px 10px
      background-repeat no-repeat
      &.on
        star('star24_on')
      &.half
        star('star24_half')
      &.off
        star('star24_off')
    .star_36
      height 15px
      width 15px
      background-size 15px 15px
      background-repeat no-repeat
      &.on
        star('star36_on')
      &.half
        star('star36_half')
      &.off
        star('star36_off')
    .star_48
      height 20px
      width 20px
      background-size 20px 20px
      background-repeat no-repeat
      &.on
        star('star48_on')
      &.half
        star('star48_half')
      &.off
        star('star48_off')
</style>
