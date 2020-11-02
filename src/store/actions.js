import {ADDCART, ADDCOUNTER} from "./mutation-types";

export default {
  addCart({state,commit},payload){
    return new Promise((resolve, reject) => {
      let oldProduct = state.cartList.find(item => item.iid === payload.iid)
      if(oldProduct){
        commit(ADDCOUNTER,oldProduct)
        resolve('当前商品数量加一')
      }else{
        payload.count = 1
        commit(ADDCART,payload)
        resolve('添加购物车成功')
      }
    })

  }
}
