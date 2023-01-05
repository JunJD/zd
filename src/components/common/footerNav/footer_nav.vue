<style lang="less" src="./footer_nav.less" scoped></style>
<template>
  <div class="footer_nav">
    <router-link to="/home">
      <i class="icon i-zd-home"></i>
      <span class="text">首页</span>
    </router-link>
    <router-link to="/serviceCentre">
      <i class="icon i-zd-service"></i>
      <span class="text">服务中心</span>
    </router-link>
    <router-link to="/calendarCenter">
      <i class="icon i-zd-schedule"></i>
      <span class="text">日程中心</span>
    </router-link>
      <router-link to="/messageCenter">
        <Badge :content="unread">
          <i class="icon i-zd-message"></i>
        </Badge>
        <span class="text">消息</span>
      </router-link>
    <router-link to="/user">
      <i class="icon i-zd-my"></i>
      <span class="text">我的</span>
    </router-link>
  </div>
</template>

<script>
import { Badge } from 'vant';

export default {
  name: 'footerNav',
  components: { Badge },
  data () {
    return { }
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
