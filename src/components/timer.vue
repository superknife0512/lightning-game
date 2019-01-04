<template>
    <div class="score">
        <div class="score__timer">
            <h3>Your time: {{ Math.round(timeWidth / 10) }}</h3>
            <div class="progress">
                <div class="progress-bar progress-bar-striped bg-info progress-bar-animated" 
                    role="progressbar" 
                    :style="{width: timeCount}" 
                    aria-valuenow="50" 
                    aria-valuemin="0" 
                    aria-valuemax="100"></div>
            </div>
            
        </div>
        <h4>Your score: </h4>
        <h2 class="score__your-score">{{score}}</h2>
    </div>
</template>

<script>
import {busEvent} from '../../busEvent.js';
import axios from 'axios';
export default {
    created(){
        this.countDown();
        busEvent.$on('updateScore', this.updateScore);
        busEvent.$on('restoreTime', this.restoreTime);
        busEvent.$on('gameOver', this.gameOver);
        busEvent.$on('saveUser', this.saveUser);
    },

    data(){
        return{
            timeWidth: 100,
            score: 0,
            highScore: 0,
        }
    },

    watch:{
        highScore(value){
            if(value === 40){
                busEvent.$emit('changeHard');
                this.highScore = 0;
            }
        }
    },

    computed:{
        timeCount(){
            return this.timeWidth + '%';
        },
    },

    methods:{
            countDown(){
                const i = setInterval(()=>{
                    if(this.timeWidth < 1){
                        busEvent.$emit('gameOver');
                        return clearInterval(i);
                    }
                    this.timeWidth = this.timeWidth - 5;
                }, 1000)
            },   

            updateScore(){
                const bonusTime = 25;
                this.score = this.score + 10;

                if(this.timeWidth + bonusTime > 100){
                    this.timeWidth = 100
                } else {
                    this.timeWidth =this.timeWidth + bonusTime
                }

                busEvent.$emit('nextQuestion');
                this.highScore = this.highScore + 10;
            },

            restoreTime(){
                this.timeWidth = 100;
                this.score = 0;
                this.countDown();
            },

            gameOver(){
                clearInterval();
                this.timeWidth = 0;
            },
            saveUser(name){
                axios.post('https://calculating-game.firebaseio.com/user.json',{
                    name: name,
                    score: this.score
                })
                .then(res=>{
                    alert('Has save your result!')
                    console.log(res);
                }).catch(err=>{
                    console.log(err);
                })
            }
        },

    }    

</script>
<style lang="scss">
    .score{
        display: flex;
        flex-direction: column;
        align-items: center;

        h3{
            color: #007194;
            margin-bottom: 1.5rem;
            transform: skewX(-10deg)
        }
        h2{
            font-size: 5rem;
            font-weight: 500;
            color: #007194;
        }
        &__timer{
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-bottom: 2rem;
            border-bottom: 1px solid #dbdbdb;
        }
    }
    .progress{
        align-self: stretch
    }
</style>
