<template>
    <div id="app">
      <router-view />
      <loading v-if="isLoading"></loading>
      <!-- 底部的固定导航栏 -->
      <footer-nav></footer-nav>
    </div>
</template>

<script>
import loading from './components/common/loading/index.vue'
import footerNav from './components/common/footerNav/footer_nav.vue'
  export default {
    name: 'app',
    computed: {
      isLoading () {
        return this.$store.getters.getLoading
      }
    },
    components: {
      loading, footerNav
    }
  }
</script>


  <style lang="less">
  @import "style/index.less";
  .app{
    box-sizing: border-box;
    overflow-x: hidden;
    min-height: 100vh;
    background-color: #F8F8F8;
    position: relative;
  }
  .icon{
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  </style>