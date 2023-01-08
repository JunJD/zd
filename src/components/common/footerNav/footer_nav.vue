<style lang="less" src="./footer_nav.less" scoped></style>
<template>
  <div class="footer_nav">
    <Tabbar v-model="active" route active-color="#1d58b6">
      <TabbarItem 
      v-for="tabbar in tabbars" 
      :key="tabbar.value" 
      replace
      :to="tabbar.value"
      :badge="tabbar.value==='/messageCenter'?unread:''"
      >
        <span>{{tabbar.name}}</span>
        <template #icon>
          <i :class="`icon ${tabbar.icon}`"></i>
        </template>
      </TabbarItem>
    </Tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';

export default {
  name: 'footerNav',
  components: { Tabbar, TabbarItem },
  data () {
    return {
      active: 0,
      tabbars:[
        {icon:'i-zd-home',value:'/home',name:'首页'},
        {icon:'i-zd-service',value:'/serviceCentre',name:'服务中心'},
        {icon:'i-zd-schedule',value:'/calendarCenter',name:'日程中心'},
        {icon:'i-zd-message',value:'/messageCenter',name:'消息'},
        {icon:'i-zd-my',value:'/user',name:'我的'},
      ]
     }
  },
  computed:{
    unread() {
      // console.log(this)
      return this.$store.getters.getUnread
      // return 1
    }
  }
}
</script>

<style lang="less" scoped>

/deep/ .van-badge--fixed{
  top: .23rem;
  right: -.1rem;
}
</style>
