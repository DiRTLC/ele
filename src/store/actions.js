import axios from 'axios'
import {GET_SELLER,GET_GOODS,GET_RATINGS,INCREASE_FOOD_COUNT,DECREASE_FOOD_COUNT,CLEAR_SHOP_CART} from './mutationTpyes'


export default {
  getSeller ({commit}) {
    axios.get('api2/seller').then(response=>{
      let result = response.data
      if(result.code===0){
        let seller = result.data
        commit(GET_SELLER,{seller})
      }

    })
  },
  getGoods ({commit}, cb) {
    axios.get('api2/goods').then(response=>{
      let result = response.data
      if(result.code===0){
        let goods = result.data
        console.log(goods);
        commit(GET_GOODS,{goods})
        cb&&cb()
      }

    })
  },
  getRatings ({commit}, cb) {
    axios.get('api2/ratings').then(response=>{
      let result = response.data
      if(result.code===0){
        let ratings = result.data
        commit(GET_RATINGS,{ratings})
        cb&&cb()
      }

    })

  },
  updateFoodCount ({commit},{food,isAdd}){
    if(isAdd) {
      commit(INCREASE_FOOD_COUNT,{food})
    }else{
      commit(DECREASE_FOOD_COUNT,{food})
    }
  },
  clearShopCart ({commit}, {foodList}) {
    commit(CLEAR_SHOP_CART, {foodList})
  }
}
