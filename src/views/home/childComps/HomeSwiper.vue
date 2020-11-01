<template>
  <Swiper>
    <SwiperItem v-for="item in banners">
      <template v-slot:default>
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </template>
    </SwiperItem>
  </Swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    props:{
      banners:{
        type:Array,
        default(){
          return []
        }
      }
    },
    name: "HomeSwiper",
    data(){
      return {
        isLoad: false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods:{
      imageLoad(){
        if (!this.isLoad){
          this.$emit('swiperLoadImage')
          this.isLoad = true
        }

      }
    }
  }
</script>

<style scoped>

</style>
