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
    mounted(){
      const list = [
                {
                type: 1,
                typeName: '其他',
                unread:8,
                origin: '学工微服务',
                title: '您有一条审批任务,请及时处理',
                date: '2022/12/06'
                },
                {
                type: 1,
                typeName: '其他',
                unread:0,
                origin: '在线发送',
                title: '尊敬的学校领导,本人是xx班的学生',
                date: '2022/10/26'
                },
                {
                type: 2,
                typeName: '待办',
                unread:2,
                origin: '事务中心',
                title: '智慧校园管理员-助学金申请:辅导员',
                date: '2022/11/25'
                },
            ]
      const unread = list.reduce((total,curr)=>{
        return total+curr.unread
      },0)
      this.$store.dispatch('setUnread', unread)
      this.$store.dispatch('setMessageList', list)
    },
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