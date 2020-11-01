<template>
  <div id="home">
    <NavBar class="home-nav">
      <template #center>
        <div>codercc商城</div>
      </template>
    </NavBar>
    <TabControl @itemClick="itemClick"
                ref="tabControl1"
                :titles="['流行', '新款', '精选']"
                class="tab-control"
                v-show="isTabFixed"/>
    <Scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pullUpLoad="true"
            @pullingUp="loadMore">
      <HomeSwiper :banners="banners" @swiperLoadImage="swiperLoadImage"/>
      <HomeRecommendView :recommends="recommends"/>
      <HomeFeatureView/>
      <TabControl @itemClick="itemClick"
                  ref="tabControl"
                  :titles="['流行', '新款', '精选']"/>
      <GoodsList class="goods" :goods="showGoods"/>
    </Scroll>
    <BackTop @click.native="backTop" class="back-top" v-show="showBackTop">
      <img src="~assets/img/common/top.png" alt="">
    </BackTop>
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import HomeRecommendView from "./childComps/HomeRecommendView";
  import HomeFeatureView from "./childComps/HomeFeatureView";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

  import {getHomeMultidata, getHomeGoods} from "network/home";
  import {debounce} from "../../common/utils";

  import {backTopMixin} from "../../common/mixin";

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      HomeRecommendView,
      HomeFeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    mixins:[backTopMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: "pop",
        // showBackTop: false,
        tabOffsetTop: 0,
        isTabFixed:false,
        saveY: 0
      }
    },
    created() {
      //1、请求多个数据
      this.getHomeMulti()
      //2、同时请求商品数据
      this.getHomeGoodsList('pop')
      this.getHomeGoodsList('new')
      this.getHomeGoodsList('sell')

    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
    },
    mounted() {
      //1、监听item中图片加载完成
      const refresh = debounce(this.$refs.scroll.refresh, 500)
      this.$bus.$on('itemImageLoad', () => {
        refresh()
      })

    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    methods: {
      /*
      * 事件监听相关方法
      * */
      itemClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new';
            break
          case 2:
            this.currentType = 'sell';
            break
        }
        this.$refs.tabControl.currentIndex = index
        this.$refs.tabControl1.currentIndex = index
      },
      // backTop() {
      //   this.$refs.scroll.scrollTo(0, 0, 500)
      // },
      contentScroll(position) {
        //1、判断backTop是否显示
        this.showBackTop = position.y < -1000

        //2、判断tabControl是否吸顶（position：fixed）
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore() {
        this.getHomeGoodsList(this.currentType)
      },
      swiperLoadImage(){
        //1、监听图片加载完，获取获取tabControl的offsetTop
        //2、获取tabControl的offsetTop
        //组件没有offsetTop属性，所以需要拿到组件模板里面的元素
        //所有的组件都有一个属性$el：用于获取组建中的元素
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
      },
      /*
      * 网络请求相关方法
      */
      getHomeMulti() {
        getHomeMultidata().then(res => {
          // console.log(res);
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        }).catch(err => {
          console.log(err);
        })
      },
      getHomeGoodsList(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // console.log(res);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          //完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        }).catch(err => {
          console.log(err);
        })
      }
    },


  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh; /*视口高度*/
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /*在使用原生浏览器滚动时使用*/
   /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;*/
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control{
    position: relative;
    z-index: 9;
  }
  .fixed{
    position: fixed;
    left: 0;
    top: 44px;
    right: 0;
  }
  /*.content{*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*  margin-top: 44px;*/
  /*}*/
  .back-top {
    position: fixed;
    right: 10px;
    bottom: 60px;
  }
</style>
