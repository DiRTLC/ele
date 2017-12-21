<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img src="./avatar.jpg" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="supports" v-if="seller.supports">
          <span class="icon" :class="supportClasses[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="supports-count" v-if="seller.supports" @click="toggleShow">
        <span class="count">{{seller.supports.length}}个</span><!--
        --><span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="toggleShow">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <span class="icon-keyboard_arrow_right"></span>
    </div>
    <div class="background">
      <img src="./avatar.jpg" alt="">
    </div>
    <transition name="fade">
      <div class="detail" v-show="isShow">
        <div class="detail-main">
          <div class="name">{{seller.name}}</div>
          <div class="star-wrapper">
            <stars :size="48" :score="seller.score"></stars>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul class="supports">
            <li class="support" v-for="(support,index) in seller.supports" :key="index">
              <span class="icon" :class="supportClasses[support.type]"></span>
              <span class="text">{{support.description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="content">
            <p>
              {{seller.bulletin}}
            </p>
          </div>

        </div>
        <div class="detail-close">
          <span class="icon-close" @click="toggleShow"></span>
        </div>
      </div>
    </transition>


  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import stars from '../stars/stars.vue'
  export default {
    data () {
      return {
        supportClasses: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
        isShow: false
      }
    },
    mounted () {

    },
    computed: {
      ...mapState(['seller'])
    },
    methods: {
      toggleShow () {
        this.isShow = !this.isShow
      }
    },
    components:{
      stars
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
.header
  position relative
  overflow hidden
  width 100%
  height 100%
  .content-wrapper
    position relative
    display flex
    background-color rgba(7,17,27,0.5)
    padding 24px 0 18px 24px
    .avatar
      width 64px
      height 64px
      border-radius 2px
      &>img
        width 100%
        height 100%
    .content
      margin-left 16px

      .title
        display flex
        margin 2px 0 8px 0
        .brand
          width 30px
          height 18px
          background-size 30px 18px
          background-repeat no-repeat
          bg-img(brand)
        .name
          margin-left 6px
          font-size 16px
          color rgb(255,255,255)
          font-weight bold
          line-height 18px
      .description
        margin-bottom 10px
        font-size 12px
        color rgb(255,255,255)
        font-weight 200
        line-height 12px
      .supports
        display flex
        .icon
          width 12px
          height 12px
          background-size 12px 12px
          background-repeat no-repeat
        .decrease
          bg-img(decrease_1)
        .discount
          bg-img(discount_1)
        .guarantee
          bg-img(guarantee_1)
        .invoice
          bg-img(invoice_1)
        .special
          bg-img(special_1)
        .text
          margin-left 4px
          font-size 10px
          color rgb(255,255,255)
          font-weight 200
          line-height 12px



    .supports-count
      position: absolute
      box-sizing border-box
      bottom 18px
      right 12px
      height 24px
      border-radius 24px
      background-color rgba(0,0,0,0.2)
      padding 7px 8px
      font-size 10px
      color rgb(255,255,255)
      font-weight 200
      line-height 12px
      text-align center
      .count
        margin-right 2px

  .bulletin-wrapper
    width 100%
    box-sizing border-box
    height 28px
    background-color rgba(7,17,27,0.2)
    padding 0 12px
    color rgb(255,255,255)
    line-height 28px
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
    position relative
    .bulletin-title
      display inline-block
      vertical-align middle
      width 22px
      height 12px
      background-size 22px 12px
      bg-img(bulletin)
    .bulletin-text
      margin 0 4px
      font-size 10px
      font-weight 200
    & > .icon-keyboard_arrow_right
      position absolute
      top: 6px
      right 7px
  .background
    position absolute
    left 0
    top 0
    width 100%
    height 100%
    z-index -1
    &>img
      width 100%
      height 100%
      filter blur(10px)

  .detail
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    box-sizing border-box
    padding 64px 36px 0 36px
    background-color rgba(7,17,27,0.8)
    z-index 100
    &.fade-enter-active, &.fade-leave-active
      transition opacity .3s
    &.fade-enter, &.fade-leave-to
      opacity 0
    .detail-main
      min-height 100%
      .name
        font-size 16px
        font-weight 700
        color rgb(255,255,255)
        line-height 16px
        text-align center
      .star-wrapper
        width 200px
        margin 16px auto 28px auto

      .title
        margin 28px 0 24px 0
        display flex
        justify-content space-between
        align-items center
        .line
          width 112px
          height 3px
          background-color rgba(255,255,255,0.2)
        .text
          font-size 14px
          font-weight 700
          color rgb(255,255,255)
          line-height 14px


      .supports
        margin-left 12px
        .support
          display flex
          align-items center
          margin-bottom 12px
          .icon
            height 16px
            width 16px
            background-size 16px 16px
            background-repeat no-repeat
            margin-right 6px
            &.decrease
              bg-img(decrease_2)
            &.discount
              bg-img(discount_2)
            &.guarantee
              bg-img(guarantee_2)
            &.invoice
              bg-img(invoice_2)
            &.special
              bg-img(special_2)
          .text
            font-size 12px
            font-weight 200
            color rgb(255,255,255)
            lineheight 12px



      .content
        box-sizing border-box
        margin 0 12px
        font-size 12px
        fontweight 200
        color rgb(255,255,255)
        line-height 24px
    .detail-close
      text-align center
      margin-top -64px
      font-size 32px
      color rgba(255,255,255,0.5)






















</style>
