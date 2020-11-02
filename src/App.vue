<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <MainTabBar/>
    <icon></icon>
    <svg-icon></svg-icon>
  </div>
</template>

<script>
  import MainTabBar from "components/content/mainTabbar/MainTabBar";
  import Icon from 'content/Icon/Icon.vue'
  import SvgIcon from 'content/Icon/svg.vue'

  export default {
    name: 'App',
    components: {
      MainTabBar,
      Icon,
      SvgIcon
    }
  }
</script>

<style>
  @import 'assets/css/base.css';
</style>
