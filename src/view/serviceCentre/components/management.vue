<template>
    <div class="management-page">
        <header>
            <NavBar title="管理我的服务"  left-arrow>
                <template #left>
                    <div @click="handleCancel">取消</div>
                </template>
                <template #right>
                    <div @click="handleSave" class="button">完成</div>
                </template>
            </NavBar>
        </header>
        <main class="main">
            <div class="main-upper">
                <Grid :column-num="5" square :border="false">
                    <GridItem v-for="(itm, index) in displayHomeList.slice(0,9)" :style="{display: itm.state===1?'':'none'}" :key="index">
                    <Badge>
                        <div class="child">
                            <svg @click="tentative" class="icon tabs-icon" aria-hidden="true">
                                <use :xlink:href="`#${itm.icon}`"></use>
                            </svg>
                            <div class="tabs-name">{{ itm.name }}</div>
                        </div>
                        <template #content>
                            <svg @click="handleDecrease(itm.parent,itm.name)" class="icon zengjia-icon" aria-hidden="true">
                                <use xlink:href="#icon-jianshao"></use>
                            </svg>
                        </template>
                    </Badge>
                    </GridItem >
                </Grid>
                <Divider v-if="displayHomeList.length>9">以上服务显示在首页</Divider>
                <Grid :column-num="5" square :border="false">
                    <GridItem v-for="(itm, index) in displayHomeList.slice(9)" :style="{display: itm.state===1?'':'none'}" :key="index">
                    <Badge>
                        <div class="child">
                            <svg @click="tentative" class="icon tabs-icon" aria-hidden="true">
                                <use :xlink:href="`#${itm.icon}`"></use>
                            </svg>
                            <div class="tabs-name">{{ itm.name }}</div>
                        </div>
                        <template #content>
                            <svg @click="handleDecrease(itm.parent,itm.name)" class="icon zengjia-icon" aria-hidden="true">
                                <use xlink:href="#icon-jianshao"></use>
                            </svg>
                        </template>
                    </Badge>
                    </GridItem >
                </Grid>
            </div>
            <div class="main-lower">
                <div v-for="(item,index) in tabsList" :key="index">
                <div :class="['main-tabs-title',{'hidden': finalIconlist(item).filter(it=>it.state!==1).length===0}]"><i>|</i> {{ item }}</div>
                <Grid :column-num="5" square :border="false">
                    <GridItem v-for="(itm, index) in finalIconlist(item)" :class="{'hidden':itm.state===1}" :key="index">
                    <Badge>
                        <div class="child">
                            <svg @click="tentative" class="icon tabs-icon" aria-hidden="true">
                                <use :xlink:href="`#${itm.icon}`"></use>
                            </svg>
                            <div class="tabs-name">{{ itm.name }}</div>
                        </div>
                        <template #content>
                            <svg @click="handleIncrease(item,itm.name)" class="icon zengjia-icon" aria-hidden="true">
                                <use xlink:href="#icon-zengjia"></use>
                            </svg>
                        </template>
                    </Badge>
                    </GridItem >
                </Grid>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import { NavBar, Grid, GridItem, Badge, Divider, Dialog, Toast } from 'vant';
import _allControlIcon from './../_allControlIcon'

export default {
    name: 'management',
    components: { NavBar, Grid, GridItem, Badge, Divider },
    data(){
        const allControlIconlist = _allControlIcon
        return {
            allControlIconlist,
            tabsList:[
            '最近使用', '离校服务', '教学服务', 'IT服务', '图书服务', '学工服务', '科研服务'
            ]
        }
    },
    computed:{
        displayHomeList(){
            let arr = []
            this.allControlIconlist.forEach(element => {
                element.list.forEach(item=>{
                    arr.push({...item, parent:element.name })
                })
            });
            return arr.filter(it=>it.state===1)
        }
    },
    methods:{
        finalIconlist(item){
            return this.allControlIconlist
            .find(itm=>itm.name===item).list
        },
        handleIncrease(item,name){
            this.control({item,name},1)
        },
        handleDecrease(item,name){
            this.control({item,name},0)
        },
        control({item,name},tag){
            this.allControlIconlist.find(itm=>itm.name===item).list = this.finalIconlist(item)
            .map(itm=>{
                if(name===itm.name){
                    return {
                        ...itm,
                        state: tag
                    }
                }
                return itm
            })
        },
        handleCancel(){
            this.$router.go(-1)
        },
        handleSave(){
            Toast('保存中...');
            setTimeout(() => {
                Toast('保存完成');
                this.handleCancel()
            }, 1000);
        },
        tentative(){
            Dialog({ message: '暂未开发' });
        },
    }
}
</script>
<style lang="less" scoped>
.management-page{
    background-color: rgb(228, 218, 218);
}
.main{
    &-upper{
        background-color: #fff;
    }
    &-lower{
        background-color: #fff;
        padding: .2rem .3rem;
    }
    &-tabs{
        &-title{
            i{
                font-weight: 900;
                color: red;
            }
            margin: .2rem 0;
            font-weight: 500;
            font-size: .39rem;
        };
    }
    .tabs-icon{
        font-size: 1rem;
    };
    .tabs-name{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        font-size: .3rem;
    }
    .zengjia-icon{
        font-size: .5rem;
    }
}
.hidden{
    display: none;
}
</style>
<style lang="less" scoped>
/deep/ .van-nav-bar__left{
    font-weight: 500;
}
/deep/ .van-nav-bar__right{
    height: 100%;
    font-weight: 500;
    .button{
        width: 1.6rem;
        line-height: .7rem;
        color: #fff;
        height: .7rem;
        background-color: red;
        border-radius: 1rem;
    }
}
/deep/ .van-badge__wrapper{
    .child{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}
/deep/ .van-badge--fixed{
    background-color: transparent;
    border: none;
    padding: 0;
}

/deep/ .van-divider{
    margin-top: 0;
    &::after{
        color: rgb(172, 132, 132);
    }
}
</style>