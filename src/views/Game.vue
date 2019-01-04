<template>
  <div class="game-play">
    <h2 class="game-play__title">Let's test your speed</h2>
    <hr>
    <div class="game-play__zone">
      <game-play></game-play>
      <timer></timer>
    </div>
  </div>
</template>

<script>
import gamePlay from '../components/gamePlay.vue';
import timer from '../components/timer.vue';
export default {
  data(){
    return{

    }
  },
  components:{
    gamePlay,
    timer
  }
}
</script>

<style lang="scss">
  .game-play{
    &__title{
      text-transform: uppercase;
      transform: skewX(-10deg);
    }
    &__zone{
      display: grid;
      grid-template-columns: 63% 37%;
      grid-column-gap: 3rem;
    }
  }
  
</style>


