<template>
    <div class="serviceCentre-home"  v-if="showThePage">
      <header>
        <Sticky>
          <div class="header-search" :style="{backgroundColor: '#ffffff'}">
            <!-- 搜索 -->
            <Search
              @focus="searchFocus"
              shape="round"
              background="#ffffff"
              :clearable="false"
              class="search-input" 
              placeholder="全部服务"
            />
            <svg @click="tentative" class="icon search-right-icon" aria-hidden="true">
              <use xlink:href="#icon-jiangbei"></use>
            </svg>
          </div>
        </Sticky>
      </header>
      <!-- 底部的固定导航栏 -->
      <footer-nav></footer-nav>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex'
  import { Search, Sticky } from 'vant';
  import { Dialog } from 'vant';
  import footerNav from '../../components/common/footerNav/footer_nav.vue'
  export default {
    components: {
      footerNav,
      Sticky, Search
    },
    data() {
      return {
        showThePage: false,
      }
    },
    mounted(){
      this.$store.dispatch('setLoading', true)
      // 模拟实际请求需要的时间
      let time = Math.floor(Math.random() * 2000)
      setTimeout(() => {
        this.$store.dispatch('setLoading', false) // loading 隐藏
        this.showThePage = true
      }, time)
    },
    computed: {
      ...mapGetters([
        'getLoading'
      ])
    },
    methods: {
      searchFocus(){
        Dialog({message: '我聚焦了'})
      },
      tentative(){
        Dialog({ message: '暂未开发' });
      }
    }
  };
  </script>
  
  <style lang="less">
  .serviceCentre-home{
    display: flex;
    flex-direction: column;
    .header-search{
      padding: 0.1rem 0.1rem;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .search-input{
        width: 90%;
        text-align: left;
        border-radius: 0.96rem;
        font-size: 0.3rem;
        color: rgb(255, 254, 254);
      }
      .search-right-icon{
        font-size: .7rem;
      }
    }
  }
  </style>
  <style scoped lang="less">
  // 重写vant的search组件样式
  /deep/ .van-search__content{
    height: .86rem;
    input{
      color: #333333;
    }
    .van-field__left-icon{
      color: #333333;
    }
  }
  </style>