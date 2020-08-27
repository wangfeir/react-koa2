<!--
 * @description: 
 * @param: 
 * @author: Fei
 * @return: 
 * @Date: 2020-08-21 14:17:33
-->
<template>

  <a-menu
    class="left-nav"
    :default-selected-keys="['1']"
    :default-open-keys="['sub1']"
    @click="handleTo"
    mode="inline"
    theme="dark"
    :inline-collapsed="collapsed"
  >
    <a-menu-item key="articleList">
      <a-icon type="pie-chart" />
      <!-- <span ><router-link to="/articleList" >产品列表</router-link></span> -->
      <span >产品列表</span>

      <!-- <router-link to="/articleList" style="display:inline-block">产品列表</router-link> -->
    </a-menu-item>
    <a-menu-item key="2">
      <a-icon type="desktop" />
      <span>Option 2</span>
    </a-menu-item>
    <a-menu-item key="3">
      <a-icon type="inbox" />
      <span>Option 3</span>
    </a-menu-item>
    <a-sub-menu key="sub1">
      <span slot="title">
        <a-icon type="mail" />
        <span>Navigation One</span>
      </span>
      <a-menu-item key="5">Option 5</a-menu-item>
      <a-menu-item key="6">Option 6</a-menu-item>
      <a-menu-item key="7">Option 7</a-menu-item>
      <a-menu-item key="8">Option 8</a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="sub2">
      <span slot="title">
        <a-icon type="appstore" />
        <span>Navigation Two</span>
      </span>
      <a-menu-item key="9">Option 9</a-menu-item>
      <a-menu-item key="10">Option 10</a-menu-item>
      <a-sub-menu key="sub3" title="Submenu">
        <a-menu-item key="11">
          <router-link to="/home">点击验证动画效果</router-link>
          <!-- Option 11 -->
        </a-menu-item>
        <a-menu-item key="12">
          <router-link to="/">点击验证动画效果2</router-link>
        </a-menu-item>
      </a-sub-menu>
    </a-sub-menu>
  </a-menu>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
    };
  },
  methods:{
   handleTo(e) {
     this.$router.push({name:e.key})
      console.log('click', e);
    },
  }
};
</script>
<style lang="less">
.left-nav{
  // height:calc(100vh-64px)
  // height:calc(~"100vh- 64px");
       height: calc(100vh - 64px);     
}
</style>