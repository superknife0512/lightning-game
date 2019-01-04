<template>
  <div class="game-play">
    <h2 class="game-play__title ">Let's test your speed</h2>
    <hr>
    <div class="game-play__zone">
      <game-play class="game-play__zone--1"></game-play>
      <timer class="game-play__zone--2"></timer>
    </div>
  </div>
</template>

<script>
import gamePlay from '../components/gamePlay.vue';
import timer from '../components/timer.vue';

export default {
  data() {
    return {

    };
  },
  components: {
    gamePlay,
    timer,
  },
};
</script>

<style lang="scss">
  .game-play{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__title{
      text-transform: uppercase;
      transform: skewX(-10deg);
    }
    &__zone{
      align-self: stretch;
      display: grid;
      grid-template-columns: 63% 37%;
      grid-column-gap: 3rem;
      @media only screen and (max-width: 600px){
        grid-template-columns: 1fr
      }

      &--1{
        @media only screen and (max-width: 600px){
          grid-column: 1/2;
          grid-row: 2/2;
        }
      }
      &--2{

      }
    }
  }

</style>
