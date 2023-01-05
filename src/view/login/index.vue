<template>
    <div class="login-page">
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
                <Button :disabled="!username || !password" round block plain color="#fff" native-type="submit">登录</Button>
            </div>
            <i>登录遇到问题</i>
        </Form>
        <div class="agreement">
            <Checkbox v-model="checked" checked-color="#ee0a24"/>
            <span>我已阅读并同意<i>《用户协议》</i>和<i>《隐私政策指引》</i></span>
        </div>
    </div>
</template>

<script>
import { Field, Form, Button, Checkbox } from 'vant';
export default {
    name: 'login',
    data(){
        return {
            checked: false,
            username: '',
            password: ''
        }
    },
    components: { Field, Form, Button, Checkbox },
    methods:{
        onSubmit(VALUES) {
            alert(VALUES.username)
        },
    }
}
</script>

<style lang="less">
    .login-page{
        background-image: url("https://b.zol-img.com.cn/desk/bizhi/image/10/960x600/1598319721647.jpg");
        display: flex;
        height: 100vh;
        justify-content: space-between;
        flex-direction: column;
    }
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
</style>

