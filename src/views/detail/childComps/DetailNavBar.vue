<template>
  <NavBar>
    <template #left>
      <div class="back" @click="backClick">
        <img src='~assets/img/common/back.svg' alt="">
      </div>
    </template>
    <template #center>
      <div class="title">
        <div
          class="title-item"
          v-for="(item,index) in titles"
          v-text="item"
          :class="{active:currentIndex === index}"
          @click="titleClick(index)"></div>
      </div>

    </template>

  </NavBar>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  export default {
    name: "DetailNavBar",
    props:{
      currentIndex:{
        type:Number,
        default: 0
      }
    },
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
      }
    },

    methods:{
      titleClick(index){
        // this.currentIndex = index
        this.$emit('itemClick', index)
      },
      backClick(){
        // this.$router.go(-1)
        this.$router.back()
      }
    }

  }
</script>

<style scoped>
  .title {
    display: flex;
    font-size: 13px;
  }

  .title-item {
    flex: 1;
  }
  .active{
    color: var(--color-high-text);
  }
  .back img{
    margin-top: 12px;
  }
</style>
