<template>
    <div class="feedback-page">
        <main class="main">
            <Form @submit="onSubmit">
                <Sticky>
                    <NavBar
                        title="意见反馈"
                        left-text="返回"
                        left-arrow
                        safe-area-inset-top
                        @click-left="goBack"
                    />
                </Sticky>
                <div class="form-content">
                    <div class="form-type">
                        <span>反馈类型</span>
                        <Tabs :line-width="0" v-model="active">
                            <Tab v-for="(item,index) in typeList" :key="index" :name="item.name">
                            <template #title>
                                <div>{{item.name}}</div>
                            </template>
                            </Tab>
                        </Tabs>
                    </div>

                    <div class="form-message">
                        <span>反馈内容</span>
                        <Field
                        v-model="message"
                        rows="8"
                        autosize
                        type="textarea"
                        show-word-limit
                        maxlength="200"
                        placeholder="我们非常重视您给我们提出的宝贵意见, 这将帮助我们不断完善产品，谢谢!"
                        />
                    </div>

                    <Field
                    v-model="phone"
                    label="联系方式"
                    placeholder="请留下你的手机号或者邮箱"
                    class="form-phone"
                    />

                    
                </div>
                <div class="save-button">
                    <Button round block type="danger" native-type="submit">提交</Button>
                </div>
                </Form>
        </main>
    </div>
</template>

<script>
    import { NavBar, Field, Tabs, Tab, Button, Sticky, Form } from 'vant';
    import { Toast } from 'vant';
    export default {
        data(){
            return{
                typeList:[
                    {name:'问题BUG'},
                    {name:'功能反馈'},
                    {name:'其他反馈'}
                ],
                active:'问题BUG',
                message:'',
                phone:''
            }
        },
        components: {
            NavBar,Field,Button, Sticky, Form,Tabs, Tab
        },
        computed:{
            finalDate(){
                return this.currentDate.map(item=>{
                    var chnNumChar = ["七","一","二","三","四","五","六"];
                    const M = this.formatNumber(item.getMonth() + 1);
                    const D = this.formatNumber(item.getDate());
                    const h = this.formatNumber(item.getHours());
                    const m = this.formatNumber(item.getMinutes())
                    let week = item.getDay();
                    return [`${M}月${D}日 周${chnNumChar[week]}`, `${h}:${m}`]
                })
            }
        },
        methods: {
            onSubmit(){
                if(!this.message){
                    Toast('反馈内容未填~')
                    return
                }
                Toast('反馈中...')
                setTimeout(() => {
                    this.goBack()
                    Toast('反馈成功')
                }, 1000);
            },
            goBack() {
                this.$router.go(-1)
            },
        },
    };
</script>

<style lang="less" scoped>
    .feedback-page{
        font-size: .6rem;
        background-color: #e1dfdf76;
        .main{
            .form-content{
                flex: 1;
                .form-type{
                    padding: .27rem .43rem;
                    background-color: #fff;
                    display: flex;
                    flex-direction: column;
                    padding-bottom: .6rem;
                    span{
                        font-size: .4rem;
                        padding: .3rem 0
                    };
                    span::after{
                        content: '*';
                        color: red;
                    }
                }
                .form-address{
                    margin-top: .3rem;
                }
                .form-message{
                    display: flex;
                    flex-direction: column;
                    padding: .27rem .43rem;
                    background-color: #fff;
                    margin-top: .3rem;
                    span{
                        font-size: .4rem;
                        padding: .3rem 0
                    };
                    span::after{
                        content: '*';
                        color: red;
                    }
                }
            }
            .save-button{
                border-top: 1px solid #a1a1a1;
                background-color: #fff;
                padding: .1rem 0;
                position: fixed;
                z-index: 999;
                bottom: 0;
                left: 0;
                right: 0;
                height: 1.34rem;
            }
        }
    }

</style>

<style lang="less" scoped>
/deep/ .van-tabs{
    height: .8rem;
    .van-tabs__nav--line{
        padding-bottom: 0 !important;
        align-items: center;
    }
}
/deep/ .van-tab{
    background-color: #f1f1f1;
    margin: 0 .1rem;
    border-radius: 1rem;
    height: .8rem;
    &--active{
        border: 1px red solid;
        background-color: rgb(255, 193, 193);
        color: red;
    }
}

/deep/ .van-field__label{
    font-size: .4rem;
    width: auto;
}

/deep/ .van-icon-arrow-left{
    color: #333 !important;
}
/deep/ .van-nav-bar__text{
    color: #333 !important;
}
</style>