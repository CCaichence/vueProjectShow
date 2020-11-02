<template>
  <div v-show="isShow" class="toast">
    <div >{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    data(){
      return {
        message:'',
        isShow:false
      }
    },
    methods:{
      show(message='默认文字',duration=2000){
        this.isShow = true
        this.message = message
        setTimeout(() => {
          this.isShow = false
          this.message = ''
        },duration)
      }
    }
  }
</script>

<style scoped>
  .toast{
    position: fixed;
    top: 50%;
    left:50%;
    transform: translate(-50%, -50%);
    color: #fff;
    padding: 8px 10px;
    background-color: rgba(0,0,0,.7);
    border-radius: 5px;
    z-index: 9999;
  }
</style>
