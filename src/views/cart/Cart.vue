<template>
  <div class="cart">
    <NavBar class="nav-bar">
      <template #center>
        <div>购物车({{length}})</div>
      </template>
    </NavBar>
    <!--商品列表-->
    <CartList/>
    <CartBottomBar />
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";

  import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar, CartList, CartBottomBar
    },
    computed: {
      //两种语法(数组语法)
      // ...mapGetters([
      //   'cartLength'
      // ])
      //对象语法
      ...mapGetters({
        length: 'cartLength'
      })
    }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: bold;
  }
</style>
