<template>
    <div>
        <transition
            enter-active-class="animated flipInY"
            leave-active-class="animated flipOutY"
            mode="out-in">

            <div v-if="isPlay"
                class="game-play__pannel alert alert-info"
                key="play">
                <h4 class="game-play__question">
                    Your Question:
                    {{ rule >= 4.5 ? `${a} - ${b} = ?` : `${a} + ${b} = ?` }}
                </h4>
                <p>Choose one correct answer bellow</p>
                <hr>
                <ul class="game-play__answers">
                    <li v-for="(ans, i ) in answers" :key="ans" class="game-play__ans">
                        <button class="btn btn-primary game-play__btn"
                            @click="chooseAns(ans)">
                            #{{ i }}: {{ ans }}
                        </button>
                    </li>
                </ul>
            </div>
            <div v-else
                class="game-play__over alert alert-danger"
                key="stop">
                <h4>Your game is over!!!</h4>
                <p>Thank you for your play</p>
                <div class="form-group">
                    <input type="text" v-model="name"
                            placeholder="Enter your name"
                            class="form-control">
                </div>
                <div class="btn-group">

                    <button class="btn btn-success"
                        @click="replay()">Play again</button>
                    <button class="btn btn-danger"
                        @click="saveUser()"
                        >Save name</button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { busEvent } from '../../busEvent.js';

export default {
  created() {
    this.createAns();
    busEvent.$on('nextQuestion', this.createAns);
    busEvent.$on('gameOver', () => {
      this.isPlay = false;
    });
    busEvent.$on('changeHard', () => {
      this.hard = this.hard + 1;
    });
  },

  data() {
    return {
      correctAns: '',
      answers: [],
      isPlay: true,
      a: '',
      b: '',
      hard: 1,
      name: '',
      rule: '',
    };
  },

  computed: {
  },

  methods: {

    createAns() {
      this.a = Math.ceil(Math.random() * 50 * this.hard + 20 * this.hard);
      this.b = Math.round(Math.random() * 20 * this.hard + 7 * this.hard);

      this.rule = Math.random() * 10;

      const fakeAns = () => {
        const ansA = this.correctAns + 9;
        const ansB = this.correctAns - 10;
        const ansC = this.correctAns + 11;
        if (this.rule <= 2.5) {
          this.answers = [this.correctAns, ansA, ansC, ansB];
        } else if (this.rule >= 2.5 && this.rule < 4.5) {
          this.answers = [ansC, this.correctAns, ansA, ansB];
        } else if (this.rule >= 4.5 && this.rule <= 7.5) {
          this.answers = [ansC, ansA, this.correctAns, ansB];
        } else {
          this.answers = [ansC, ansA, this.correctAns, ansB];
        }
      };


      console.log(this.rule);
      if (this.rule < 2.5) {
        this.correctAns = this.a + this.b;
        fakeAns();
      } else if (this.rule >= 2.5 && this.rule < 4.5) {
        this.correctAns = this.a + this.b;
        fakeAns();
      } else if (this.rule >= 4.5 && this.rule < 7.5) {
        this.correctAns = this.a - this.b;
        fakeAns();
      } else {
        this.correctAns = this.a - this.b;
        fakeAns();
      }
    },

    chooseAns(ans) {
      if (ans === this.correctAns) {
        busEvent.$emit('updateScore', 10);
      } else {
        this.isPlay = false;
        busEvent.$emit('gameOver');
      }
    },

    replay() {
      // something here
      this.isPlay = true;
      this.hard = 1;
      this.createAns();
      this.name = '';
      busEvent.$emit('restoreTime');
    },

    saveUser() {
      if (this.name !== '') {
        busEvent.$emit('saveUser', this.name);
        this.name = '';
      } else {
        alert('You should enter your name!!');
        return false;
      }
    },
  },
};
</script>

<style lang="scss">
    // %positioning{
    //     position: absolute;
    //     top: 0;
    //     left: 0;
    // }

    .game-play{
        &__pannel{
            // @extend %positioning;
        }
        &__answers{
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(2, auto);
            grid-row-gap: 1.5rem;
            list-style: none;
            margin-left: -2rem;
            margin-top: 2rem;
        }

        &__btn{
            padding: .7rem 1.5rem;
        }

        &__over{
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 3rem 0;
            // @extend %positioning;
        }

        &__wrapper{
            position: relative;
        }
    }
</style>
