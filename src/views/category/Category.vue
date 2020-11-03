<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>

    <div class="content">
      <tab-menu :categories="categories"
                @selectItem="selectItem"></tab-menu>
      <TabControl :titles="['综合', '新品', '销量']"
                   @itemClick="tabClick"
                   v-show="isTabFixed"
                   class="tab-control2"
                   ref="tabControl" />
      <scroll id="tab-content"
              :data="[categoryData]"
              ref="scroll"
              :probe-type="3"
              @scroll="contentScroll">
        <div>
          <tab-content-category :subcategories="showSubcategory" @imageLoad="imageLoad"></tab-content-category>
          <TabControl :titles="['综合', '新品', '销量']"
                       @itemClick="tabClick"
                       ref="tabControl3" />
          <tab-content-detail :category-detail="showCategoryDetail"></tab-content-detail>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
  import NavBar from 'common/navbar/NavBar'

  import TabMenu from './childComps/TabMenu'
  import TabControl from 'content/tabControl/TabControl'
  import Scroll from 'common/scroll/Scroll'
  import TabContentCategory from './childComps/TabContentCategory'
  import TabContentDetail from './childComps/TabContentDetail'

  import {getCategory, getSubcategory, getCategoryDetail} from "network/category";
  import {POP, SELL, NEW} from "../../common/const";
  // import {tabControlMixin} from "../../common/mixin";

  import {debounce} from "../../common/utils";

  export default {
    name: "Category",
    components: {
      NavBar,
      TabMenu,
      TabControl,
      Scroll,
      TabContentCategory,
      TabContentDetail
    },
    // mixins: [tabControlMixin],
    data() {
      return {
        categories: [],
        categoryData: {},
        currentIndex: -1,
        isTabFixed:false,
        tabOffsetTop:0,
        currentType: POP
      }
    },
    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh,500)
      this.$bus.$on('categoryItemImgLoad',() => {
        refresh()
      })
    },
    updated() {
      this.tabOffsetTop = this.$refs.tabControl3.$el.offsetTop
    },
    created() {
      // 1.请求分类数据
      this._getCategory()
    },
    computed: {
      showSubcategory() {
        if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
      },
      showCategoryDetail() {
        if (this.currentIndex === -1) return []
        return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    },
    methods: {
      contentScroll(position){
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = POP
            break
          case 1:
            this.currentType = NEW
            break
          case 2:
            this.currentType = SELL
            break
        }
        // console.log(this.$refs.tabContrtrol);
        // console.log(this.$refs.tabContrtrol3);
        // this.$refs.tabContrtrol2.currentIndex = index
        // this.$refs.tabContrtrol3.currentIndex = index
      },
      imageLoad(){
        this.$refs.scroll.refresh()

      },
      _getCategory() {
        getCategory().then(res => {
          // 1.获取分类数据
          this.categories = res.data.category.list
          // 2.初始化每个类别的子数据
          for (let i = 0; i < this.categories.length; i++) {
            this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          // 3.请求第一个分类的数据
          this._getSubcategories(0)
        })
      },
      _getSubcategories(index) {
        this.currentIndex = index;
        const mailKey = this.categories[index].maitKey;
        getSubcategory(mailKey).then(res => {
          this.categoryData[index].subcategories = res.data
          this.categoryData = {...this.categoryData}
          this._getCategoryDetail(POP)
          this._getCategoryDetail(SELL)
          this._getCategoryDetail(NEW)
        })
      },
      _getCategoryDetail(type) {
        // 1.获取请求的miniWallkey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
        // 2.发送请求,传入miniWallkey和type
        getCategoryDetail(miniWallkey, type).then(res => {
          // 3.将获取的数据保存下来
          this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
        })
      },
      /**
       * 事件响应相关的方法
       */
      selectItem(index) {
        this._getSubcategories(index)
      }
    }
  }
</script>

<style scoped>
  #category {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
  }
  .tab-control2{
    position: fixed;
    width: 75%;
    z-index: 10;
    right: 0;
  }
  #tab-content {
    height: 100%;
    flex: 1;
  }
</style>
