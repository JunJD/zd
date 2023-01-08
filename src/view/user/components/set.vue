<template>
    <div class="userSet-page">
        <Sticky>
            <NavBar
            title="系统设置"
            left-text="返回"
            left-arrow
            safe-area-inset-top
            @click-left="goBack"
            />
        </Sticky>
        <main class="main">
            <Button @click="handleExit"  block color="#fff">退出登录</Button>
        </main>
    </div>
</template>

<script>
import { Button, Sticky, NavBar } from 'vant';
export default {
    name: 'userSet',
    components: {Button,Sticky, NavBar},
    methods:{
        handleExit(){
            this.$store.dispatch('setToken', 0)
            this.$router.push('/login')
        },
        goBack() {
            this.$router.go(-1)
        },
    }
}
</script>

<style lang="less" scoped>
.userSet-page{
    .main{
        padding: .3rem 0;
        // height: 2rem;
    }
    // height: 100vh;
    // background-color: #fff;
}

/deep/ .van-button{
    color: #333 !important;
    font-size: .45rem;
    width: 10rem;
    height: 1.5rem;
}
/deep/ .van-icon-arrow-left{
    color: #333 !important;
}
/deep/ .van-nav-bar__text{
    color: #333 !important;
}
</style>