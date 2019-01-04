<template>
  <div class="container">
    <h3 class="game-play__title">Play to get high rank</h3>
    <hr>
    <div v-if="!isLoaded" class="d-flex justify-content-center">
      <i class="fas fa-spinner game-play__spin"></i>
    </div>
    <div v-else>

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

        Player <span class="ranking">{{ `${rank.name}`}} </span> <strong class="ranking">{{`get ${rank.score} score` }}</strong> <br>
        <small>Very good job!</small>
      </div>

    </div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  created() {
    axios.get('https://calculating-game.firebaseio.com/user.json')
      .then((response) => {
        console.log(response);
        this.isLoaded = true;
        const usersObject = response.data; // {}
        const usersArray = Object.values(usersObject).sort((a, b) => b.score - a.score); // []
        const normalRanks = usersArray.slice(2, 10);
        this.normalRanks = normalRanks;
        const topRanks = usersArray.slice(0, 2);
        this.topRanks = topRanks;
      }).catch((err) => {
        console.log(err);
      });
  },

  data() {
    return {
      normalRanks: [],
      topRanks: [],
      isLoaded: false,
    };
  },
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

  .game-play__spin{
    animation: spin infinite linear 2s;
    font-size: 4rem;
    color: #ee5f1c;
  }

  @keyframes spin{
    0%{
      transform: rotate(0deg);
    }
    100%{
      transform: rotate(360deg);
    }
  }
</style>
