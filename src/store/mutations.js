import {ADDCART, ADDCOUNTER} from "./mutation-types";

export default {
  [ADDCOUNTER](state, payload) {
    payload.count++
  },
  [ADDCART](state,payload){
    payload.checked = true
    state.cartList.push(payload)
  }

}
