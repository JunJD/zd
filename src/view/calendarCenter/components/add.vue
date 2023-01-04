<template>
    <div class="add-page">
        <main class="main">
            <Form @submit="onSubmit">
                <Sticky>
                    <NavBar
                    title="新增日程"
                    left-text="取消"
                    left-arrow
                    safe-area-inset-top
                    @click-left="goBack"
                    />
                </Sticky>
                <div class="form-content">
                    <Field
                    v-model="notestitle"
                    left-icon="notes-o"
                    placeholder="请输入日程名称"
                    class="form-title"
                    />

                    <Cell is-link class="form-calendar-select" icon="bookmark-o" title="我的日历" @click="show = true" />
                    <ActionSheet
                        @select="onCalendarSelect"
                        description="所属日历"
                        v-model="show"
                        :actions="actions"
                        close-on-click-action
                        @cancel="()=>{}"
                    />

                    <div class="form-date">
                        <SwitchCell class="form-date-control" title="全天时间" v-model="checked" />
                        <div class="form-date-day">
                            <Cell class="form-date-day-first" @click="onSelectShow(1)" >
                                <template #title>
                                    <span class="custom-title">{{ finalDate[0][0] }}</span>
                                    <p v-if="!checked">{{finalDate[0][1]}}</p>
                                </template>
                            </Cell>
                            <Icon name="arrow" />
                            <Cell class="form-date-day-last" @click="onSelectShow(2)" >
                                <template #title>
                                    <div>
                                        <span class="custom-title">{{finalDate[1][0]}}</span>
                                        <p v-if="!checked">{{finalDate[1][1]}}</p>
                                    </div>
                                </template>
                            </Cell>
                        </div>
                        <ActionSheet
                            v-model="dateSelectShow"
                        >
                            <DatetimePicker
                                :type="!checked?'datetime':'date'"
                                :columns-order="['year','month', 'day', 'hour', 'minute']"
                                @cancel="cancel"
                                @confirm="confirm"
                                :formatter="formatter"
                                :min-date="minDate"
                                :max-date="maxDate"
                            />
                        </ActionSheet>
                        <Cell is-link  icon="replay" title="不重复" @click="repeatSetting" />
                        
                        
                    </div>

                    <Field
                    v-model="address"
                    left-icon="bulb-o"
                    placeholder="请输入日程地址(选填)"
                    class="form-address"
                    />

                    <Cell is-link class="form-reminder" icon="replay" title="不提醒" @click="reminderShow = true" />
                    <ActionSheet
                        @select="onReminderSelect"
                        description="日程提醒"
                        v-model="reminderShow"
                        :actions="reminderActions"
                        close-on-click-action
                        @cancel="()=>{}"
                    />
                    <Field
                    v-model="remark"
                    class="form-remark"
                    rows="5"
                    autosize
                    type="textarea"
                    maxlength="50"
                    placeholder="输入描述(选填)"
                    />
                </div>
                <div class="save-button">
                    <Button round block type="info" native-type="submit">提交</Button>
                </div>
                </Form>
        </main>
    </div>
</template>

<script>
    import { NavBar, Field, Button, Sticky, Form, ActionSheet, Cell, SwitchCell,Icon, DatetimePicker, Dialog } from 'vant';
    import { Toast } from 'vant';
    export default {
        data(){
            return{
                remark:'',
                notestitle:'',
                address:'',
                currentDate:[new Date(), new Date()],
                minDate: new Date(new Date().setMonth(new Date().getMonth()-2)),
                maxDate: new Date(new Date().setMonth(new Date().getMonth()+2)),
                flag:1,
                show: false,
                reminderShow:false,
                dateSelectShow:false,
                checked: false,
                actions: [{ name: ' 我的日历' }],
                reminderActions: [{ name: '不提醒' }, { name: '开始时' }, { name: '5分钟前' }, { name: '15分钟前' },{ name: '30分钟前' }, { name: '1小时前' }, { name: '1天前' }],
            }
        },
        components: {
            NavBar,Field,Button, Sticky, Form,ActionSheet,Cell,Icon,SwitchCell,DatetimePicker
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
            onSelectShow(flag){
                this.flag=flag
                this.dateSelectShow = true
            },
            confirm(value){
                this.currentDate[this.flag - 1] = value
                this.currentDate = [...this.currentDate]
                this.dateSelectShow = false
            },
            cancel(){
                this.dateSelectShow = false
            },
            onSubmit(){
                Toast('保存中...')
                setTimeout(() => {
                    this.goBack()
                    Toast('保存成功!')
                }, 1000);
            },
            goBack() {
                this.$router.go(-1)
            },
            onCalendarSelect(item){
                // 可以通过 close-on-click-action 属性开启自动收起
                this.show = false;
                Toast(item.name);
            },
            onReminderSelect(item){
                // 可以通过 close-on-click-action 属性开启自动收起
                this.reminderShow = false;
                Toast(item.name);
            },
            repeatSetting(){
                Dialog({message: '待开发'})
            },

            formatNumber(n){
                n = n.toString()
                return n[1]? n: '0'+n
            },
            formatter(type, val) {
                if (type === 'year') {
                    return val + '年';
                }
                if (type === 'month') {
                    return val + '月';
                }
                if (type === 'day') {
                    return val + '日';
                }
                return val;
            },
        },
    };
</script>

<style lang="less" scoped>
    .add-page{
        font-size: .6rem;
        background-color: #e1dfdf76;
        .main{
            .form-content{
                flex: 1;
                .form-title{
                    margin-top: .3rem;
                    padding-bottom: .6rem;
                }
                .form-calendar-select{
                    margin-top: .3rem;
                    padding: .5rem .426rem;
                }
                .form-date{
                    margin-top: .3rem;
                    display: flex;
                    flex-direction: column;
                    &-control{
                        padding: .5rem .426rem;
                    }
                    &-day{
                        margin: 2px 0;
                        background-color: #fff;
                        height: 1.8rem;
                        padding: .2rem 0;
                        font-size: .3rem;
                        display: flex;
                        align-items: center;
                        .custom-title{
                            font-size: .38rem;
                            white-space:nowrap;
                        }
                        &-first, &-last{
                            flex: 1;
                        }
                        i{
                            width: 1rem;
                            font-size: 1.2rem;
                            color: #a1a1a1;
                           
                        }
                    }
                }
                .form-address{
                    margin-top: .3rem;
                }
                .form-reminder{
                    margin-top: .3rem;
                }
                .form-remark{
                    margin-top: .3rem;
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

/deep/ .van-field__left-icon{
    padding-right: .2rem;
}
/deep/ .van-icon {
    font-size: .5rem;
}
 /deep/ .van-form{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100vh;
        }
/deep/ .van-popup {
    // padding-bottom: 1.44rem ;
    z-index: 9999;
}
</style>