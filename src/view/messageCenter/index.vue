<template>
    <div class="message-page"  v-if="showThePage">
        <Sticky>
            <header class="header">
                <div class="header-title">
                    <h3>消息</h3>
                    <div class="header-title-icon">
                        <i v-if="isGroup" @click="switchBearings" class="icon i-zd-jiantou_shangxiaqiehuan"></i>
                        <i v-if="isGroup" @click="switchLayouts" class="icon i-zd-caidan1"></i>
                        <i v-if="!isGroup" @click="switchLayouts" class="icon i-zd-caidan"></i>
                    </div>
                </div>
                <Search
                    @focus="searchFocus"
                    readonly
                    shape="round"
                    background="rgb(248, 248, 248)"
                    :clearable="false"
                    class="search-input" 
                    placeholder="全部服务"
                />
            </header>
        </Sticky>
        <main>
            <Collapse v-if="isGroup" v-model="activeNames" >
                <CollapseItem v-for="messages in finalMessageList" :title="messages.typeName" :name="messages.type" :key="messages.typeName">
                    <div @click="tentative"  v-for="message,index in messages.data" class="main-message" :key="index">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-biaoji_"></use>
                        </svg>
                        <div class="main-message-content">
                            <div class="main-message-content-origin">{{message.origin}}</div>
                            <div class="main-message-content-title">{{message.title}}</div>
                        </div>
                        <div class="main-message-right">
                            {{message.date}}
                            <div v-if="message.unread" class="main-message-right-unread">{{message.unread}}</div>
                        </div>
                    </div>
                </CollapseItem>
            </Collapse>
            <Collapse v-else :value="[1]" class="disabled" :border="false" >
                <CollapseItem  :name="1"> 
                    <div @click="tentative" v-for="message,index in finalMessageList" class="main-message" :key="index">
                        <svg @click="tentative" class="icon" aria-hidden="true">
                            <use xlink:href="#icon-biaoji_"></use>
                        </svg>
                        <div class="main-message-content">
                            <div class="main-message-content-origin">{{message.origin}}</div>
                            <div class="main-message-content-title">{{message.title}}</div>
                        </div>
                        <div>
                            {{message.date}}
                        </div>
                    </div>
                </CollapseItem>
            </Collapse>
        </main>
        <!-- 底部的固定导航栏 -->
      <footer-nav></footer-nav>
    </div>
</template>

<script>
import footerNav from '../../components/common/footerNav/footer_nav.vue'
import { Search, Sticky, Dialog, Collapse, CollapseItem } from 'vant';
export default {
    name: 'messageCenter',
    components: { footerNav, Search, Sticky, Collapse, CollapseItem },
    mounted(){
        this.$store.dispatch('setLoading', true)
        // 模拟实际请求需要的时间
        let time = Math.floor(Math.random() * 2000)
        setTimeout(() => {
            this.$store.dispatch('setLoading', false) // loading 隐藏
            this.showThePage = true
        }, time)
        // 默认全部展开
        this.activeNames = [...this.finalMessageList.map(item=>item.type)]
    },
    data(){
        return {
            showThePage: false,
            isGroup: true,
            activeNames:[],
        }
    },
    computed:{
        messageList(){
            return this.$store.getters.getMessageList
        },
        finalMessageList(){
            if(!this.isGroup){
                return this.messageList
            }
            return this.messageList.reduce((total, currentValue)=>{
                const index = total.findIndex(itm=>itm.type===currentValue.type)
                if(index>-1){
                    total[index].data.push(currentValue)
                }else{
                    total.push({
                        type: currentValue.type,
                        typeName: currentValue.typeName,
                        data:[currentValue]
                    })
                }
                return total
            },[])
        }
    },
    methods: {
        searchFocus(){
            Dialog({message: '我聚焦了'})
        },
        tentative(){
            Dialog({ message: '暂未开发' });
        },
        switchLayouts(){
            this.isGroup = !this.isGroup
        },
        switchBearings(){
            
        }
    }
}
</script>

<style lang="less" scoped>
body{
    background-color: #fff;
}
.message-page{
    background-color: #fff;
    .header{
        background-color: rgb(248, 248, 248);
        &-title{
            display: flex;
            justify-content: space-between;
            padding: .3rem .5rem ;
            font-size: .5rem;
            h3{
                font-weight: 700;
            }
            &-icon{
                i{
                    margin-left: .38rem;
                }
            }
        }
        .search-input{
            font-size: .5rem;
            /deep/ .van-search__content{
                background-color: #fff;
            }
        }
    }
    .main{
        &-message{
            display: flex;
            justify-content: space-between;
            padding: .2rem 0;
            .icon{
                font-size: 1.2rem;
                margin-right: .1rem;
            }
            &-content{
                width: 6rem;
                &-origin{
                    color: rgb(244, 238, 238);
                }
                &-title{
                    padding: .2rem 0;
                    overflow: hidden;
                    max-width: 6rem;
                    text-overflow: ellipsis;
                    white-space: nowrap; //文本不换行，这样超出一行的部分被截取，显示...
                    font-size: .4rem;
                }
            }
            &-right{
                display: flex;
                align-items: flex-end;
                flex-direction: column;
                &-unread{
                    margin-top: .3rem;
                    text-align: center;
                    border-radius: 50%;
                    background-color: rgb(231, 21, 21);
                    width: .5rem;
                    height: .5rem;
                    line-height: .5rem;
                    color: #fff;
                }
            }
        }
    }
}
</style>

<style lang="less" scoped>

/deep/ .van-cell__title{
    font-weight: 600;
}
.disabled{
    /deep/ .van-collapse-item__title--expanded{
        display: none;
    }
}
</style>