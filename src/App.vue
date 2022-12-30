<template>
    <div id="app">
      <router-view />
      <loading v-if="isLoading"></loading>
    </div>
</template>

<script>
import loading from './components/common/loading/index.vue'

  export default {
    name: 'app',
    computed: {
      isLoading () {
        return this.$store.getters.getLoading
      }
    },
    components: {
      loading
    }
  }
</script>


  <style lang="less">
  @import "style/index.less";
  .icon{
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  </style>