<template>
  <div class="container">
    <h3 class="game-play__title">Play to get high rank</h3>
    <hr>

    <div class="alert alert-danger rank-wrapper" role="alert">
      <div>        
        Player <span class="ranking">{{ topRanks[0].name }} </span> <strong class="ranking">{{`get ${topRanks[0].score} score` }}</strong> <br>
        <small>This is the champion! Can you beat him ???</small>
      </div>  
      <i class="fas fa-trophy rank-cup"></i>    
    </div>

    <div class="alert alert-warning rank-wrapper" role="alert">
      <div>
        Player <span class="ranking">{{ topRanks[1].name }} </span> <strong class="ranking">{{`get ${topRanks[1].score} score` }}</strong> <br>
        <small>Runner Up player!! Good job!!</small>
      </div> 
      <i class="fas fa-medal rank-medal"></i>     
    </div>

    <div class="alert alert-primary" 
        role="alert"
        v-for="rank in normalRanks"
        :key="rank.name">

      Player <span class="ranking">{{ `${rank.name}`}} </span> <strong class="ranking">{{`get ${rank.score} score` }}</strong> 
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  created(){
    axios.get('https://calculating-game.firebaseio.com/user.json')
      .then(response=>{
        const usersObject = response.data; //{}
        const usersArray = Object.values(usersObject); //[]
        const normalRanks = usersArray.slice(3,10).sort((a, b)=>{
          return b.score - a.score;
        });
        this.normalRanks = normalRanks;
        const topRanks =  usersArray.slice(0,3).sort((a, b)=>{
          return b.score - a.score;
        });
        this.topRanks = topRanks;

      }).catch(err=>{
        console.log(err);
      })
  },

  data(){
    return{
      normalRanks: [],
      topRanks: [],
    }
  }
};
</script>

<style lang="scss">
  .ranking{
    text-transform: uppercase;
  }

  .rank-wrapper{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .rank-cup, .rank-medal{
    font-size: 3rem;
  }
</style>

