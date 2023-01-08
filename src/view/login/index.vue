<template>
    <div class="login-page">
        <main class="login-main" :style="{height: `${height}px`}">
            <Form @submit="onSubmit">
                <h5>账号密码登录</h5>
                <Field
                    v-model="username"
                    name="username"
                    placeholder="输入学号/工号/手机号/证件号"
                />
                <Field
                    v-model="password"
                    type="password"
                    name="password"
                    placeholder="输入密码"
                />
                <div style="margin: 16px;">
                    <Button :loading="submitLoading" ref="submit" :disabled="!username || !password" round block plain color="#fff" native-type="submit">登录</Button>
                </div>
                <i>登录遇到问题</i>
            </Form>
            <div class="agreement">
                <Checkbox v-model="checked" checked-color="#ee0a24"/>
                <span>我已阅读并同意<i @click="agreement">《用户协议》</i>和<i @click="agreement">《隐私政策指引》</i></span>
            </div>
        </main>
        <ActionSheet v-model="show" title="请阅读并同意以下条款">
            <div class="content">
                <div class="content-agreement"><i @click="agreement">《用户协议》</i>和<i @click="agreement">《隐私政策指引》</i></div>
                <Button @click="show=false; checked=true; $refs.submit.click()" round block color="red">同意并继续</Button>
            </div>
        </ActionSheet>
    </div>
</template>

<script>
import { Field, Form, Button, Checkbox, Toast, ActionSheet } from 'vant';
// import myAxios from '../../utils/myRequest';
export default {
    name: 'login',
    data(){
        return {
            checked: false,
            username: '',
            password: '',
            show:false,
            submitLoading:false,
            height: 0
        }
    },
    mounted(){
        this.height = window.innerHeight
    },
    components: { Field, Form, Button, Checkbox, ActionSheet },
    methods:{
        onSubmit(VALUES) {
            if(this.checked){
                this.submitLoading = true
                setTimeout(() => { // 模拟异步请求
                    if(VALUES.username==='ddd' && VALUES.password==='123'){
                        this.$store.dispatch('setToken', 12345)
                            this.submitLoading = false
                            this.$router.push('/home')
                    }else{
                        Toast('账号或密码错误');
                        this.submitLoading = false
                    }
                }, 1000);
            }else{
                this.show = true
            }
        },
        agreement(){
            Toast('功能即将开放(账号ddd;密码123)');
        }
    }
}
</script>

<style lang="less">
    .login-page{
        
        .login-main{
            background-image: url("https://b.zol-img.com.cn/desk/bizhi/image/10/960x600/1598319721647.jpg");
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            .agreement{
                background-color: transparent;
                display: flex;
                font-size: .3rem;
                justify-content: center;
                align-items: center;
                padding: .3rem 0;
                color: #dad4d4;
                span{
                    margin-left: .2rem;
                    i{
                        color: #fff;
                    }
                } 
            }
        }
        .content{
            height: 4rem;
            padding: .6rem;
            font-size: .5rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            &-title{
                font-weight: 700;
            }
            &-agreement{
                font-size: .39rem;
                font-weight: 400;
                color: red;
            }
        }
    }
    

</style>

<style lang="less" scoped>
/deep/ .van-form{
    display: flex;
    flex-direction: column;
    h5{
        font-size: .8rem;
        padding: .8rem .4rem .5rem;
        color: #fff;
    }
    .van-field{
        padding: .5rem .4rem;
        background-color: transparent;
        color: #fff;
        &::after{
            border: none;
        }
    }
    i{
        font-size: .3rem;
        text-align: end;
        padding-right: .4rem;
        color: #fff;
    }
    .van-button{
        background-color: #fff;
        color: #403f3f !important;
        font-size: .5rem;
    }
}
/deep/ .van-action-sheet__header{
    padding: .5rem 0 .1rem;
}
</style>

