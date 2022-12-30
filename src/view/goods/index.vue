<template>
    <div class="page-home"  v-if="showThePage">
      <header class="header">
        <i class="icon i-zd-badge"></i>
        <!-- 搜索 -->
        <!-- <input type="text" class="search-input" > -->
        <Search v-model="value" class="search-input" placeholder="请输入搜索关键词" />
        <i class="icon i-zd-notice"></i>
      </header>
    </div>
  </template>
  
  <script>
  import Search from 'vant/lib/search';
  import 'vant/lib/search/style';
  import { mapGetters } from 'vuex'
  export default {
    name: 'home',
    components: {Search},
    data () {
      return {
        value:'',
        showThePage: false, // 是否展示当前页面
      }
    },
    computed: {
        ...mapGetters([
        'getLoading'
        ])
    },
    mounted () {
    this.$store.dispatch('setLoading', true)

    // 模拟实际请求需要的时间
    let time = Math.floor(Math.random() * 2000)
    setTimeout(() => {
      this.$store.dispatch('setLoading', false) // loading 隐藏
      this.showThePage = true
    }, time)
  },
  }
  </script>
  
<style lang="less" scoped>
@import '../../style/mixin.less';
.page-home{
	padding-bottom: 1.333333rem;
	.header{
		width: 100%;
		padding: 0.3rem 0.373333rem;
		background-color: @blue;
		color: @white;
		display: flex;
		align-items: center;
		justify-content: space-between;
		i{
			font-size: .66rem;
		}
		.search-input{
			width: 80%;
			height: 0.86rem;
			margin: 0.2rem 0;
			text-align: left;
			border-radius: 0.96rem;
			box-shadow: 0 0.026667rem 0.066667rem 0 rgba(20, 20, 20, 0.2);
			font-size: 0.346667rem;
			background-color: #f1f1f10c;
			color: rgb(255, 254, 254);
		} 	
	}
}


</style>
  