<template>
    <div class="user-page">
      <Badge>
        <header class="header">
          <div class="header-picture">头像</div>
          <div class="header-name">
            我是张家辉<br/>
            <span class="header-name-id">201020121</span>
          </div>
        </header>
      </Badge>
      <main  class="main">
        <CellGroup>
          <Cell @click="cellClick" v-for="cell,index in CellList" :icon="cell.icon" :key="`${index}${cell.name}`" :title="cell.name" is-link />
        </CellGroup>
      </main>
      <!-- 底部的固定导航栏 -->
      <footer-nav></footer-nav>
    </div>
  </template>
  
  <script>
  import footerNav from './../../components/common/footerNav/footer_nav.vue'
  import { Cell, CellGroup, Badge, Dialog } from 'vant';
  export default {
    data(){
      return {
        CellList : [
          {icon: 'points', name: '设置'},
          {icon: 'points', name: '意见反馈'},
          {icon: 'points', name: '关于我们'},
          {icon: 'points', name: '隐私保护指引摘要'},
          {icon: 'points', name: '人脸协议隐私政策指引'},
          {icon: 'points', name: '个人信息收集清单'},
          {icon: 'points', name: '第三方共享个人信息清单'}
        ]
      }
    },
    components: {
      Badge,
      Cell,
      CellGroup,
      footerNav
    },
    methods:{
      cellClick(){
        this.tentative()
      },
      tentative(){
          Dialog({ message: '暂未开发' });
      },
    }
  };
  </script>
  
  <style lang="less">
  .user-page{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    .header{
      display: flex;
      align-items: center;
      padding: .8rem .5rem;
      font-size: .6rem;
      &-picture{
        border-radius: 50%;
        width: 1.8rem;
        height: 1.8rem;
        background-color: rgb(109, 219, 41);
        text-align: center;
        line-height: 1.8rem;
        color: #fff;
      }
      &-name{
          margin-left: .5rem;
          &-id{
            font-size: .38rem;
            color: #999;
          }
        }
      flex: 1;
    }
    .main{
      flex: 1;
    }
  }
  
  </style>

  <style lang="less" scoped>

  /deep/ .van-cell, .van-cell--clickable{
    padding: .42rem .42rem;
    color: #222;
    font-size: .36rem;
  }

  </style>