<template>
    <TabBar>
        <TabBarItem path="/home" activeColor="red">
            <template v-slot:item-icon>
                <img src="../../../assets/img/tabbar/home.png" alt="">
            </template>
            <template v-slot:item-icon-active>
                <img src="../../../assets/img/tabbar/home_active.png" alt="">
            </template>
            <template v-slot:item-text>
                <div>首页</div>
            </template>
        </TabBarItem>
        <TabBarItem path="/category" activeColor="red">
            <template v-slot:item-icon>
                <img src="~assets/img/tabbar/classification.png" alt="">
            </template>
            <template v-slot:item-icon-active>
                <img src="~assets/img/tabbar/classification_active.png" alt="">
            </template>
            <template v-slot:item-text>
                <div>分类</div>
            </template>
        </TabBarItem>
        <TabBarItem path="/cart" activeColor="red">
            <template v-slot:item-icon>
                <img src="~assets/img/tabbar/cart.png" alt="">
            </template>
            <template v-slot:item-icon-active>
                <img src="~assets/img/tabbar/cart_active.png" alt="">
            </template>
            <template v-slot:item-text>
                <div>购物车</div>
            </template>
        </TabBarItem>
        <TabBarItem path="/profile" activeColor="red">
            <template v-slot:item-icon>
                <img src="~assets/img/tabbar/profile.png" alt="">
            </template>
            <template v-slot:item-icon-active>
                <img src="~assets/img/tabbar/profile_active.png" alt="">
            </template>
            <template v-slot:item-text>
                <div>我的</div>
            </template>
        </TabBarItem>
    </TabBar>

</template>

<script>
    import TabBar from "common/tabbar/TabBar";
    import TabBarItem from "common/tabbar/TabBarItem";
    export default {
        name: "MainTabBar",
        components: {
            TabBar,
            TabBarItem
        }
    }
</script>

<style scoped>

</style>
