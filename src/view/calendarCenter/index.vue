<template>
    <div class="calendar-center-page">
        <Sticky>
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
        </Sticky>
        <main class="main">
            <div class="main-blocks">
                <div class="calendar-blocks">
                    <ul class="hours">
                        <li v-for="index in 24" class="hour-row-identifier" :key="index">
                            <div>
                                {{ index-1 }}:00
                            </div>
                        </li>
                    </ul>
                    <!-- 12:00-16:00 -->
                    <div class="kalendar-event" v-for="evt in eventsDay" :key="evt.data.title" :style="{top: `${evt.start*0.2*6}rem`,height: `${evt.distance*6*0.2}rem`,left: `${1.5+8.2*evt.left}rem`, width:` ${8.2*evt.width}rem`}">
                        <span>{{evt.data.title}}</span>
                        <i>{{evt.data.address}}</i>
                    </div>
                    <ul v-for="itm in 6" :class="['kalendar-day','building-blocks']" :key="itm">
                        
                        <li v-for="index in 24*6" class="kalendar-cell" :key="index"></li>
                    </ul>
                </div>

            </div>
        </main>
    </div>
</template>

<script>
import { Swipe, SwipeItem, Sticky } from 'vant'
import { Dialog } from 'vant';
import { initbasic, weekDay} from './_weekday'
import events from './events'
const ONEDAYTIME = 24*60*60*1000;//一天的时间
export default {
    name: "calendarCenter",
    components:{ Swipe, SwipeItem, Sticky },
    data(){
        return {
            showDate: [],
            weekDay,
            basic: initbasic,
            current: 0,
            date: initbasic,
            events
        }
    },
    computed:{
        eventsDay(){
            return events[this.date.year][this.date.month][this.date.day]
        }
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
                time = nowTime + 7*ONEDAYTIME;
            }else {
                // 左移
                time = nowTime - 7*ONEDAYTIME;
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
                    time = nowTime - (week-i)*ONEDAYTIME;
                }else{
                    if(i == week){
                        time = nowTime
                    }else{
                        time = nowTime + (i-week)*ONEDAYTIME;
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
    margin-bottom: 1.34rem;
    .header{
        background-color: #ffffff;
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
    .main{
        padding-top: 1rem;
        position: relative;
        .main-blocks{
            display: flex;
            position: relative;
            margin: 0 auto;
            .calendar-blocks{
                display: flex;
                position: relative;
                .hours{
                    display: flex;
                    flex-direction: column;
                    color: #b8bbca;
                    font-weight: 500;
                    font-size: .85rem;
                    width: 1.5rem;
                    height: 100%;
                    .hour-row-identifier{
                        font-size: .3rem;
                        height: 1.3rem;
                        padding-left: .2rem;
                        margin-top: -.1rem;
                    }
                }
                .kalendar-day{
                    position: relative;
                    flex: 1;
                    width: 1.4rem;
                    margin-bottom: 0;
                    display: flex;
                    flex-direction: column;
                    .kalendar-cell{
                        height: .2rem;
                    }
                }
                .building-blocks li:nth-child(6n+1){
                    border-top: solid 1px #e0e0e0;
                }
                .kalendar-event{
                    z-index: 9;
                    background-color: #ffffff;
                    font-size: .38rem;
                    position: absolute;
                    border-radius: .2rem;
                    border: solid 2px #e0e0e0;
                    border-left: rgb(255, 157, 0) .2rem solid;
                    color: #333;
                    i{
                        font-size: .2rem;
                        color: #a9a9a9;
                    }
                }
            }
        }
    }
    
    
}
</style>