<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      pullUpLoad:{
        type: Boolean,
        default:false
      },
      data:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      //1、创BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
      //2、监听滚动位置
      if(this.probeType === 2 || this.probeType === 3){
        this.scroll.on('scroll', position => {
          this.$emit('scroll',position)
        })
      }
      //3、监听上拉到底部
      if (this.pullUpLoad){
        this.scroll.on('pullingUp',() => {
          this.$emit('pullingUp')
        })
      }
    },
    methods: {
      scrollTo(x, y, time = 300) {
        //先判断是否有scroll这个对象是否存在，不然会出现scrollTo()方法undefined的情况
        this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, 300)
      },
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp()
      },
      refresh(){
        this.scroll && this.scroll.refresh && this.scroll.refresh()
      },
      getScrollY(){
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>

</style>
