<template>
    <div class="page-home"  v-if="showThePage">
      <header class="header" :style="{backgroundColor: curColor}">
        <!-- 增加磁性布局效果 -->
        <Sticky>
          <div class="header-search" :style="{backgroundColor: curColor}">
            <i @click="tentative" class="icon i-zd-badge"></i>
            <!-- 搜索 -->
            <!-- <input type="text" class="search-input" > -->
            <Search
              v-model="value"
              shape="round"
              :background="curColor"
              :clearable="false"
              class="search-input" 
              placeholder="搜索服务/待办/咨询"
            />
            <i @click="tentative" class="icon i-zd-notice"></i>
          </div>
        </Sticky>
        <div class="header-shortcut">
          <div @click="tentative" v-for="item in shortcuts" :key="item.icon">
            <i :class="`icon ${item.icon}`"></i>
            <div>{{ item.name }}</div>
          </div>
        </div>

        <div class="header-swipe">
          <Swipe :autoplay="3000" @change="onChange" :show-indicators="false" :duration="2000">
            <SwipeItem v-for="(color, index) in colors" :key="index" class="card" >
              <div @click="tentative" class="cardWrap">
                <div :style="{backgroundColor:color}">我是颜色</div>
              </div>
            </SwipeItem>
          </Swipe>
        </div>
      </header>
      <main class="main">
        <div class="main-serve"> 
          <Grid :column-num="5" square :border="false">
            <GridItem v-for="(item, index) in baseServes" :key="index">
              <Badge>
                <svg @click="tentative" class="icon" aria-hidden="true">
                  <use :xlink:href="`#${item.icon}`"></use>
                </svg>
                <div>{{ item.name }}</div>
                <template #content>
                  <Icon name="award-o" class="badge-icon"/>
                </template>
              </Badge>
            </GridItem >

          </Grid>
        </div>
        <div class="main-swipe" >
          <div class="cardWrap">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-tongzhigonggao"></use>
            </svg>
            <Swipe :autoplay="1500" :show-indicators="false" :duration="500">
              <SwipeItem v-for="(goodNew, index) in goodNews" class="goodNew" :key="index" >
                {{goodNew}}
              </SwipeItem>
            </Swipe>  
          </div>
        </div>

        <div class="main-news">
          <Tabs v-model="active" swipeable :line-width="0">
            <Tab v-for="(item,index) in [...newsTitle,{name:null}]" :key="index" :disabled="!item.name">
              <template #title>
                  <div v-if="!item.name" class="titleicon" @click="tentative">
                    <i  class="icon i-zd-shezhi"></i>
                  </div>
                <div>{{item.name}}</div>
              </template>

              <div class="main-news-content">
                <div v-for="(itm, idx) in newsContent[item.name]"  :key="`${item.name}_${idx}`">
                  <div class="card">
                    <h5 class="news-content" >{{itm.title}}</h5>
                    <div>
                      <p>{{ itm.author }}</p>
                      <i>{{ itm.date }}</i>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </main>
      <!-- 底部的固定导航栏 -->
      <footer-nav></footer-nav>
    </div>
  </template>
  
  <script>
  import { Search, Swipe, SwipeItem, Grid, GridItem, Badge, Icon, Sticky, Tabs, Tab } from 'vant'
  import { Dialog } from 'vant';
  import footerNav from '../../components/common/footerNav/footer_nav.vue'
  import { mapGetters } from 'vuex'
  import _baseServe from './_baseServe'
  import _newlist from './_newlist'
  export default {
    name: 'home',
    components: { Search, Swipe, SwipeItem, Grid, GridItem, Badge, Icon, Sticky, Tabs, Tab, footerNav },
    data () {
      const baseServes = [..._baseServe]
      const newsContent = {..._newlist}
      return {
        value:'',
        showThePage: false, // 是否展示当前页面
        shortcuts:[{icon:'i-zd-saoyisao', name:'扫一扫'},{icon:'i-zd-jiaoyiliushui', name:'流水账单'},{icon:'i-zd-yiqiatong', name:'一卡通'},{icon:'i-zd-zixun', name:'咨询中心'}],
        baseServes,
        colors: ['#a132af','#f100f1','blue'],
        goodNews: ['千城百校聊|相约太原,xx携手本地高校共绘...xx携手本地高校共','江西市场再创佳绩-五所高校捷报频传文字文字!!'],
        newsTitle:[
          {name: '校内新闻'},
          {name: 'oa公告'},
          {name: '部门动态'},
          {name: '学术交流'}
        ],
        newsContent,
        curColor: '#a132af'
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
    methods: {
      onChange(index){
        this.curColor = this.colors[index]
      },

      tentative(){
        Dialog({ message: '暂未开发' });
      }
    }

  }
  </script>
  
<style lang="less" scoped>
@import '../../style/mixin.less';
.page-home{
  display: flex;
  flex-direction: column;
	.header{
		width: 100%;
		color: @white;
    .header-search{
      padding: 0.1rem 0.25rem;;
      // background-color: @blue;
      display: flex;
      align-items: center;
      justify-content: space-between;
      i:first-child{
        color: #f12112;
      }
      i{
        font-size: .66rem;
      }
      .search-input{
        width: 90%;
        text-align: left;
        border-radius: 0.96rem;
        font-size: 0.3rem;
        color: rgb(255, 254, 254);
      } 	
    }
    .header-shortcut{
      margin: .4rem 0;
      display: flex;
      justify-content: space-around;
      text-align: center;
      font-size: .3rem;
      i{
        font-size: 1.1rem;
      }
    }
    .header-swipe{
      height: 1rem;
      width: 100%;
      .card{
        padding: 0 .3rem;
        background-color: transparent;
        height: 2.8rem;
        width: 100%;
        position: relative;
        .cardWrap{
          background-color: #938080;
          height: 2.8rem;
          width: 100%;
          box-sizing: border-box;
          overflow: hidden;
          border: .3rem solid transparent;
          border-radius: 8px
        }
      }
    }
	}

  .main{
    margin: 2rem 0;
    width: 100%;
    .main-serve{
      text-align: center;
      font-size: .3rem;
      svg{
        font-size: 1rem;
      }
      .badge-icon{
        font-size: .3rem;
      }
    }

    .main-swipe{
      padding: 1rem 0 .1rem;
      .cardWrap{
        margin: 0 .3rem;;
        display: flex;
        align-items: center;
        background-color: #fff;
        height: 1rem;
        position: relative;
        box-sizing: border-box;
        overflow: hidden;
        border-radius: .3rem;
        svg{
          font-size: 1.5rem;
          margin: 0 .3rem;
        }
        .goodNew{
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap; //文本不换行，这样超出一行的部分被截取，显示...
          font-size: .3rem;
        }
      }
    }
    .main-news{
      .titleicon{
        width: 1.3rem;
        text-align: right;
        i{
          font-size: .45rem;
          font-weight: 700;
        }
      }
      padding: 0 .2rem;
      .main-news-content{
        display: flex;
        flex-direction: column;
        width: 100%;
        position: relative;
        background-color: #fff;
        width: 100%;
        box-sizing: border-box;
        overflow: hidden;
        border: .3rem solid transparent;
        border-radius: 8px;
        .card{
            padding: .1rem;
            height: 2rem;
          h5{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap; //文本不换行，这样超出一行的部分被截取，显示...
            font-size: .4rem;
            font-weight: 500;
          }
          div{
            display: flex;
            font-size: .28rem;
            p, i{
              margin: .48rem .3rem .1rem 0;
            }
          }
      }
      }
    }
  }
}
</style>
<style lang="less" scoped>
// 重写vant的search组件样式
/deep/ .van-search__content{
  background-color: #f1f1f125;
  height: .86rem;
  input{
    color: #fff;
  }
  .van-field__left-icon{
    color: #fff;
  }
}
/deep/ .van-grid {
  .van-grid-item{
    .van-grid-item__content{
      background-color: transparent;
    }
  }
}
/deep/ .van-tab--active{
  font-size: .4rem;
  font-weight: 700;
}

/deep/ .van-tabs__nav{
  background-color: transparent;
}
</style>
  