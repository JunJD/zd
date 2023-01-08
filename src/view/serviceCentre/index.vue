<template>
    <div class="service-center-page"  v-if="showThePage">
      <header class="header">
        <Sticky>
          <div class="header-search" :style="{backgroundColor: '#ffffff'}">
            <!-- 搜索 -->
            <Search
              @focus="searchFocus"
              readonly
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

        <div class="header-control">
          <div class="control-text">我的服务</div>
            <div v-for="(item, index) in displayHomeList" class="control-icon" :key="index">
              <svg v-if="!expansion" @click="handleControlClick(item.more)" class="icon" aria-hidden="true">
                <use :xlink:href="`#${item.icon}`"></use>
              </svg>
            </div >
          <Button @click="toManagement" class="control-button" round color="red" size="small" plain>管理</Button>
        </div>
        <div class="header-control-expansion" v-if="expansion">
          <Grid :column-num="5" square :border="false">
            <GridItem v-for="(item, index) in displayHomeList" :key="index">
              <!-- <Badge> -->
                <svg @click="handleControlClick(item.more)" class="icon control-expansion-icon" aria-hidden="true">
                  <use :xlink:href="`#${item.icon}`"></use>
                </svg>
                <p class="tabs-name">{{ item.name }}</p>
              <!-- </Badge> -->
            </GridItem >
          </Grid>
        </div>
      </header>

      <main class="main">
        <div class="main-tabs">
          <Tabs scrollspy sticky offset-top="1.5rem">
            <Tab v-for="(item,index) in tabsList" :title="item" :key="index">
              <div v-if="index!==0" class="main-tabs-title"><i>|</i> {{ item }}</div>
              <SwitchCell v-if="index===0" class="collection-control" title="仅显收藏" v-model="checked"/>
              <Grid :column-num="5" square :border="false">
                <GridItem v-for="(item, index) in finalIconlist(item)" :key="index">
                  <!-- <Badge> -->
                    <svg @click="handleControlClick(item.more)" class="icon tabs-icon" aria-hidden="true">
                      <use :xlink:href="`#${item.icon}`"></use>
                    </svg>
                    <div class="tabs-name">{{ item.name }}</div>
                  <!-- </Badge> -->
                </GridItem >
              </Grid>
              <div v-if="index===tabsList.length-1" class="tabs-list-end"></div>
            </Tab>
          </Tabs>
        </div>
      </main>

      <!-- 底部的固定导航栏 -->
      <footer-nav></footer-nav>
    </div>
  </template>
  
  <script>
  import _allControlIcon from './_allControlIcon'
  import footerNav from './../../components/common/footerNav/footer_nav.vue'
  import { Search, Sticky, Button, Grid, GridItem, Tabs, Tab, SwitchCell } from 'vant';
  import { Dialog } from 'vant';
  export default {
    components: {
      footerNav,
      Sticky, Search, Button, Grid, GridItem, Tabs, Tab, SwitchCell
    },
    data() {
      const allControlIconlist = _allControlIcon
      return {
        allControlIconlist,
        checked:false,
        showThePage: false,
        expansion: false,
        tabsList:[
          '最近使用', '离校服务', '教学服务', 'IT服务', '图书服务', '学工服务', '科研服务'
        ]
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
      displayHomeList(){
          let arr = []
          this.allControlIconlist.forEach(element => {
            element.list.forEach(item=>{
              arr.push({...item, parent:element.name })
            })
          });
          return [...arr.filter(it=>it.state===1).slice(0,9),{icon: this.expansion?"icon-shouqi":"icon-gengduo1", more: true}]
        }
    },
    methods: {
      finalIconlist(item){
        return this.allControlIconlist
          .find(itm=>itm.name===item).list
          .filter(item=>!this.checked || item.collect===1) // 仅显收藏功能
      },
      searchFocus(){
        Dialog({message: '我聚焦了'})
      },
      handleControlClick(more){
        if (more) {
          this.expansion = !this.expansion
        }else{
          this.tentative()
        }
      },
      toManagement(){
        this.$router.push('/serviceCentre/management')
      },
      tentative(){
        Dialog({ message: '暂未开发' });
      },
    }
  };
  </script>
  
  <style lang="less">
  @import '../../style/mixin.less';
  .service-center-page{
    display: flex;
    flex-direction: column;
    .header{
      width: 100%;
      color: @white;
      .header-search{
        padding: 0.1rem 0.1rem;
        height: 1.5rem;
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
      .header-control{
        display: flex;
        align-items: center;
        padding: .1rem .3rem .3rem;
        font-size: .4rem;
        color: #333;
        background-color: #ffffff;
        .control-text{
          flex: 4;
        }
        .control-icon{
          flex: 1;
        }
        .control-button{
          flex: 1.2;
        }
      }
      .header-control-expansion{
        color: #333;
        background-color: #ffffff;
        p{
          font-size: .3rem;
        }
        .control-expansion-icon{
          font-size: 1rem;
        }
      }
    }

    .main{
      margin: .3rem 0;
      background-color: #ffffff;
      width: 100%;
      .main-tabs{
        border-radius: 10px;
        p{
          font-size: .3rem;
        }
        &-title{
          i{
            font-weight: 900;
            color: red;
          }
          margin: .2rem;
          font-weight: 500;
          font-size: .39rem;
        }
        .tabs-icon{
          font-size: 1rem;
        };
        .collection-control{
          width: 95%;
          border-radius: 10px;
          background-color: #f1f1f1a0;
          margin: .2rem auto;
          padding: .1rem ;
        }
        .tabs-list-end{
          height: 74vh;
        }
      }
    }
    .tabs-name{
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      font-size: .3rem;
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
  /deep/ .van-button {
    height: .6rem;
  }
  </style>