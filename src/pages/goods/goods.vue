<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li class="menu-item" v-for="(good, index) in goods" :key="index" :class="{current: currentIndex===index}" @click="changeList(index)">
          <span class="text border-1px">
            <span class="icon" v-if="good.type>0" :class="supportClasses[good.type]"></span><!--
         -->{{good.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li class="food-list food-list-hook" v-for="(good,index) in goods" :key="index">
          <h1 class="title">{{good.name}}</h1>
          <ul>
            <li class="food-item border-1px" v-for="(food,index) in good.foods"
                :key="index" @click="showFood(food)">
              <div class="icon">
                <img width="57" height="57" :src="food.icon" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月销{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart></shopcart>
    <food :food="food" ref="food"></food>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'
  import cartcontrol from '../../components/cartcontrol/cartcontrol.vue'
  import shopcart from '../../components/shopcart/shopcart.vue'
  import food from '../../components/food/food.vue'
  export default {
    data () {
      return {
        supportClasses: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
        tops: [],
        scrollY: 0,
        food: {}
      }
    },
    mounted () {
      this.$store.dispatch('getGoods', () => {
        this.$nextTick(() => {
          this._initScroll()
          this._initTops()
        })
      })

    },
    methods: {
      _initScroll () {
        const menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true

        })
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 2
        })
        this.foodsScroll.on('scroll', (event) => {
          this.scrollY = Math.abs(event.y)
        })
        this.foodsScroll.on('scrollEnd', (event) => {
          this.scrollY = Math.abs(event.y)
        })
      },
      _initTops () {
        const tops = []
        let top = 0
        tops.push(top)
        let lis = document.getElementsByClassName('food-list-hook')
        Array.prototype.slice.call(lis).forEach((li) => {
          top += li.clientHeight
          tops.push(top)
        })

        this.tops = tops
      },
      changeList (index) {
        let {tops} = this
        this.scrollY = tops[index]
        this.foodsScroll.scrollTo(0, -tops[index], 300)
      },
      showFood (food) {
        this.food = food
        this.$refs.food.toggleShow()
      }
    },
    computed: {
      ...mapState(['goods']),
      currentIndex () {
        let {scrollY, tops} = this
        let index = tops.findIndex((top, index) => {
          return scrollY >= tops[index] && scrollY < tops[index + 1]
        })
        return index
      }
    },
    components: {
      cartcontrol,
      shopcart,
      food
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"

  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-img('decrease_3')
          &.discount
            bg-img('discount_3')
          &.guarantee
            bg-img('guarantee_3')
          &.invoice
            bg-img('invoice_3')
          &.special
            bg-img('special_3')
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
