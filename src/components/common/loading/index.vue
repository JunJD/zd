<template>
  <div class="loading" >
    <Loading size="68px" vertical color="#0094ff">加载中...</Loading>
  </div>
</template>
  
  <script>
  import { Loading } from 'vant';
  export default {
    name: 'myloading',
    components:{ Loading },
    data () {
      return {}
    }
  }
  </script>
  <style lang="less" scoped>
  .loading{
    width: 100%;
    height: 100%;
  }
  </style>
  