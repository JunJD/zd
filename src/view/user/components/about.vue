<template>
    <div class="about-page" :style="{height: `${height}px`}">
        <Sticky>
            <NavBar
            title="树维大学"
            left-text="返回"
            left-arrow
            safe-area-inset-top
            @click-left="goBack"
            />
        </Sticky>
        <main class="main">
            <div class="school-badge"></div>
            <div class="version-no">
                版本号1.0.2(2676)
            </div>
            <div class="version-information">
                版本信息:1.9.9.810962012182123
            </div>
            <Cell class="mt2" title="版本更新" is-link value="已是最新版本" />
            <Cell title="用户协议" is-link />
            <Cell title="隐私政策指引" is-link  />
        </main>
    </div>
</template>

<script>
import { Sticky, NavBar, Cell } from 'vant';
export default {
    name: 'about',
    components: { Sticky, NavBar, Cell },
    data(){
        return{
            height: 0
        }
    },
    mounted(){
        this.height = window.innerHeight
    },
    methods:{
        goBack() {
            this.$router.go(-1)
        },
    }
}
</script>

<style lang="less" scoped>

.about-page{
    background-color: #fff;
    .main{
        display: flex;
        flex-direction: column;
        align-items: center;
        .school-badge{
            margin: 1rem 0;
            width: 2.3rem;
            height: 2.3rem;
            border-radius: 50%;
            background-color: #12aadd;
        }
        .version-no{
            font-size: .6rem;
        }
        .version-information{
            margin: .1rem 0;
            color: #9e9d95;
            font-size: .4rem;
        }
    }
}
.mt2{
    margin-top: 2rem;
}
</style>
<style lang="less" scoped>
/deep/ .van-cell{
    background-color: transparent;
}
/deep/ .van-icon-arrow-left{
    color: #333 !important;
}
/deep/ .van-nav-bar__text{
    color: #333 !important;
}
</style>