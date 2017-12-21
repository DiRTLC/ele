<template>
  <div>
    <app_header/>
    <div class="tab">
      <div class="tab_item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab_item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab_item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import header from './components/header/header.vue'
import axios from 'axios'

export default {

  mounted () {
    this.$store.dispatch('getSeller')
  },

  components: {
    app_header: header
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixins.styl"
  .tab
    display flex
    width 100%
    height 40px
    line-height 40px
    justify-content space-around
    border-1px(rgba(7,17,27,0.1))
    .tab_item
      &>a
        font-size 14px
        color: rgb(77,85,93)
        line-height 14px
      .router-link-exact-active
        font-size 14px
        color: rgb(240,20,20)
        line-height 14px
</style>
