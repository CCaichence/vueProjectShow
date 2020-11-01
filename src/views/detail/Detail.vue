<template>
  <div id="detail">
    <DetailNavBar class="detail-nav" @itemClick="titleClick" :current-index="currentIndex"/>
    <Scroll class="content"
            ref="scroll"
            @scroll="contentScroll"
            :data="[topImages, goods, shop, detailInfo, paramInfo, commentInfo, recommendList]"
            :probe-type="3">
      <DetailSwiper :top-images="topImages" />
      <DetailBaseInfo ref="base" :goods="goods"/>
      <DetailShopInfo :shop="shop"/>
      <DetailGoodsInfo :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <DetailParamInfo ref="param" :param-info="paramInfo"/>
      <DetailCommentInfo ref="comment" :comment-info="commentInfo"/>
      <DetailRecommendInfo ref="recommend" :recommend-list="recommendList" />
    </Scroll>
    <DetailBottomBar @addToCart="addToCart" />
    <BackTop @click.native="backTop" class="back-top" v-show="showBackTop">
      <img src="~assets/img/common/top.png" alt="">
    </BackTop>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailRecommendInfo from './childComps/DetailRecommendInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import BackTop from "components/content/backTop/BackTop";

  import Scroll from "components/common/scroll/Scroll";

  import {getDetail,getRecommend, Goods, Shop, GoodsParam} from "network/detail";
  import {debounce} from "../../common/utils";
  import {backTopMixin} from "../../common/mixin";

  export default {
    name: "Detail",
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailRecommendInfo,
      DetailBottomBar,
      BackTop,
      Scroll
    },
    mixins:[backTopMixin],
    data() {
      return {
        iid: null,
        topImages:[],
        goods: {},
        shop:{},
        detailInfo: {},
        paramInfo:{},
        commentInfo:{},
        recommendList:[],
        themeTops:[],
        currentIndex: 0
      }
    },
    created() {
      this.iid = this.$route.query.iid
      // console.log(this.iid);
      this.getDetail()
      this.getRecommend()
    },
    mounted() {
      //1、监听item中图片加载完成
      const refresh = debounce(this.$refs.scroll.refresh, 500)
      this.$bus.$on('detailItemImgLoad', () => {
        refresh()
      })
    },
    updated() {
      // 获取需要的四个offsetTop
      this.getOffsetTops()
    },
    methods:{
      addToCart(){
        // 1.创建对象
        const obj = {}
        // 2.对象信息
        obj.iid = this.iid;
        obj.imgURL = this.topImages[0]
        obj.title = this.goods.title
        obj.desc = this.goods.desc;
        obj.newPrice = this.goods.nowPrice;
        // 3.添加到Store中
        this.$store.commit('addCart', obj)
      },
      getOffsetTops(){
        this.themeTops = []
        this.themeTops.push(this.$refs.base.$el.offsetTop)
        this.themeTops.push(this.$refs.param.$el.offsetTop)
        this.themeTops.push(this.$refs.comment.$el.offsetTop)
        this.themeTops.push(this.$refs.recommend.$el.offsetTop)
        this.themeTops.push(Number.MAX_VALUE)
      },
      /*
      * 事件监听相关方法
      * */
      titleClick(index){
        this.$refs.scroll.scrollTo(0, -this.themeTops[index], 200)
      },
      imageLoad(){
        this.$refs.scroll.refresh()
      },
      contentScroll(position){
        this.showBackTop = position.y < -1000

        this.listenScrollTheme(-position.y)
      },
      listenScrollTheme(position) {
        let length = this.themeTops.length;
        for (let i = 0; i < length - 1; i++) {
          let iPos = this.themeTops[i];
          /**
           * 判断的方案:
           *  方案一:
           *    条件: (i < (length-1) && currentPos >= iPos && currentPos < this.themeTops[i+1]) || (i === (length-1) && currentPos >= iPos),
           *    优点: 不需要引入其他的内容, 通过逻辑解决
           *    缺点: 判断条件过长, 并且不容易理解
           *  方案二:
           *    条件: 给themeTops最后添加一个很大的值, 用于和最后一个主题的top进行比较.
           *    优点: 简洁明了, 便于理解
           *    缺点: 需要引入一个较大的int数字
           * 疑惑: 在第一个判断中, 为什么不能直接判断(currentPos >= iPos)即可?
           * 解答: 比如在某一个currentPos大于第0个时, 就会break, 不会判断后面的i了.
           */
          if (position >= iPos && position < this.themeTops[i+1]) {
            if (this.currentIndex !== i) {//此判断是防止重复赋值
              this.currentIndex = i;
            }
            break;
          }
        }
      },
      /*
      * 网络请求相关方法
      * */
      getDetail(){
        getDetail(this.iid).then(res =>{
          // console.log(res);
          const data = res.result
          //1、获取顶部轮播数据
          this.topImages = data.itemInfo.topImages
          //2.获取商品信息
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
          //3、创建店铺信息对象
          this.shop = new Shop(data.shopInfo)
          // 4、获取商品信息
          this.detailInfo = data.detailInfo
          // 5.保存参数信息
          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

          // 6.保存评论信息
          if (data.rate.list) {
            this.commentInfo = data.rate.list[0];
          }
        }).catch(err =>{
          console.log(err);
        })
      },
      getRecommend(){
        getRecommend().then(res => {
          // console.log(res);
          this.recommendList = res.data.list
        }).catch(err => {
          console.log(err);
        })
      }
    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content{
    height: calc(100% - 93px);
  }
  .back-top {
    position: fixed;
    right: 10px;
    bottom: 60px;
  }
</style>
