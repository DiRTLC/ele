import Vue from 'vue'
import {GET_SELLER,GET_GOODS,GET_RATINGS,INCREASE_FOOD_COUNT,DECREASE_FOOD_COUNT,CLEAR_SHOP_CART} from './mutationTpyes'

export default {
  [GET_SELLER] (state,{seller}) {
    state.seller = seller
  },
  [GET_GOODS] (state,{goods}) {
    state.goods = goods
  },
  [GET_RATINGS] (state,{ratings}) {
    state.ratings = ratings
  },
  [INCREASE_FOOD_COUNT] (state,{food}) {
    if(food.count) {
      food.count++
    }else{
      Vue.set(food, 'count', 1)
    }
  },
  [DECREASE_FOOD_COUNT] (state,{food}) {
    if(food.count) {
      food.count--
    }
  },
  [CLEAR_SHOP_CART] (state, {foodList}) {
    foodList.map(food => food.count = 0)
  }
}
