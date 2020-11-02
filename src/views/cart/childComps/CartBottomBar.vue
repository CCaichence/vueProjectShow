<template>
  <div class="bottom-bar">
    <div class="check-content">
      <CheckButton class="check-button"
                   :value="isSelectAll"
                   @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去结算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from "./CheckButton";
  import {mapGetters} from 'vuex'

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return '￥' + this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preVal, item) => {
          return preVal + item.newPrice * item.count
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        if (this.cartList.length === 0) return false;
        //如果数组里面有未选中的，说明length 有值,性能不高
        // return !(this.cartList.filter(item => !item.checked).length)
        //性能高
        return !(this.cartList.find(item => !item.checked))
      }

    },
    methods: {
      checkClick() {
        if (this.isSelectAll) {//全部选中，点击后全部不选中
          this.cartList.forEach(item => item.checked = false)
        }else{//有部分选中，点击后全部选中
          this.cartList.forEach(item => item.checked = true)
        }
        //注意，在此处，不能简写成this.cartList.forEach(item => item.checked = ！this.isSelectAll)
      },
      calcClick(){
        if(!this.isSelectAll){
          this.$toast.show('请选择购买的商品')
        }else{
          this.$toast.show('该功能暂未实现，敬请期待！')
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    width: 100%;
    height: 44px;
    background-color: #fff;
    position: fixed;
    bottom: 50px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 20px;
    box-sizing: border-box;
    display: flex;
  }

  .check-content {
    display: flex;
    align-items: center;
    width: 60px;
  }

  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }

  .price {
    margin-left: 20px;
    flex: 1;
  }

  .calculate {
    width: 90px;
    background: #f13e3a;
    color: #fff;
    text-align: center;
  }
</style>
