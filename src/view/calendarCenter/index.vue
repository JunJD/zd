<template>
    <div class="calendar-center-page">
        <header class="header">
            <div class="header-control">
                <div class="header-date">
                    {{ `${date.year}年${date.month}月${date.day}月` }}
                </div>
                <div>
                    <svg @click="checkToDay" class="icon search-right-icon" aria-hidden="true">
                        <use xlink:href="#icon-jinrishouru"></use>
                    </svg>
                    <svg @click="tentative" class="icon search-right-icon" aria-hidden="true">
                        <use xlink:href="#icon-sousuo"></use>
                    </svg>
                    <svg @click="tentative" class="icon search-right-icon" aria-hidden="true">
                        <use xlink:href="#icon-gengduo2"></use>
                    </svg>
                </div>
            </div>
            <div class="calendar-data-content">
                <div>
                    <li v-for="(item, index) in weekDay" class="everyday" :key="`${index}_${item.value}`">
                        {{item.label}}
                    </li>
                </div>
                <div>
                    <Swipe class="my-swipe" :show-indicators="false" @change="onSwipeChange">
                        <SwipeItem v-for="index in 3" :key="index">
                            <div v-for="(itm,idx) in showDate" class="everyday" :key="`${idx}_${itm.day}`">
                                <div :class="['everyday-text', {'check': itm.check }]" @click="handleCheckDate(itm)">
                                    <p>
                                        {{ itm.day }}
                                        <span v-if="itm.data">.</span>
                                    </p>
                                    
                                </div>
                            </div>
                        </SwipeItem>
                    </Swipe>
                </div>
            </div>
        </header>
        <main class="main">

        </main>
    </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant'
import { Dialog } from 'vant';
import { initbasic, weekDay} from './_weekday'
let oneDayTime = 24*60*60*1000;//一天的时间
export default {
    name: "calendarCenter",
    components:{ Swipe, SwipeItem },
    data(){
        return {
            showDate: [],
            weekDay,
            basic: initbasic,
            current: 0,
            date: initbasic
        }
    },
    computed:{
    },
    mounted(){
        this.showDate = this.renderWeek(this.basic.year, this.basic.month, this.basic.day)
    },
    methods:{
        handleCheckDate(date){
            this.date = date
            this.showDate = this.renderWeek(this.date.year, this.date.month, this.date.day)
        },
        checkToDay(){
            this.handleCheckDate(initbasic)
        },
        timeToDate(time){
            let data = new Date(time);
            return { year: data.getFullYear(), month: data.getMonth() + 1, day: data.getDate()}
        },
        onSwipeChange(index){
            let newDateDay = new Date(this.basic.year, this.basic.month-1, this.basic.day);
            const nowTime = newDateDay.getTime(); // 获取时间戳
            let time = 0;
            if(index-this.current===1 || index-this.current===-2 ){
                // 右移 
                time = nowTime + 7*oneDayTime;
            }else {
                // 左移
                time = nowTime - 7*oneDayTime;
            }
            this.basic = this.timeToDate(time)
            this.showDate = this.renderWeek(this.basic.year, this.basic.month, this.basic.day)
            this.current = index; //当前索引
        },
        renderWeek(year, month, day){
            let newDay = new Date(year, month - 1, day);
            const nowTime = newDay.getTime();
            let week = newDay.getDay();//判断今天是周几
            if(week === 0) { week = 7 }
            let list = [];
			for(let i = 1; i < 8; i++){
                let check = false
                let time = 0;
                if(i < week){
                    time = nowTime - (week-i)*oneDayTime;
                }else{
                    if(i == week){
                        time = nowTime
                    }else{
                        time = nowTime + (i-week)*oneDayTime;
                    }
                }
                let data = new Date(time);
                const y = data.getFullYear();
                const m = data.getMonth() + 1;
                const d = data.getDate();
                if (y === this.date.year && m === this.date.month && d === this.date.day) {
                    check = true;
                }
                list.push({
                    year: y,
                    month: m,
                    day: d,
                    check,
                    data: !(i%2==0)
                })
            }
            return list;
        },
        tentative(){
            Dialog({ message: '暂未开发' });
        },
    }
}
</script>
<style lang="less">
.calendar-center-page{
    background-color: #ffffff;
    .header{
        &-control{
            width: 100%;
            border-bottom: 1px solid #b6b5b536;
            padding: .1rem .3rem .26rem;
            margin-bottom: .3rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .header-date{
                font-size: .4rem;
                font-weight: 450;
            }
            svg{
                font-size: .5rem;
                margin: 0 .3rem;
            }
        }
        .calendar-data-content{
        display: flex;
        overflow: hidden;
        flex-direction: column;
        padding: 0 .2rem;
        .everyday{
            color: #333;
            font-size: .38rem;
            list-style: none;
            flex: 1;
            width: 1.35rem;
            height: 1.05rem;
            float: left;
            text-align: center;
            position: relative;
            font-weight: 400;
            .everyday-text{
                display: inline-block;
                height: 1.05rem;
                width: 1.05rem;
                text-align: center;
                line-height: .8rem;
                font-weight: 500;
                p{
                    display: flex;
                    flex-direction: column;
                    span{
                        color: rgba(51, 51, 51, 0.144);
                        margin-top: -.5rem ;
                        font-size: .8rem;
                    }
                }
            }
            .check {
                background-color: red;
                color:#ffffff;
                border-radius: 50%;
                p{
                    span{
                    color: #fff;
                }
                }
            }
        }
    }
    }
    
}
</style>