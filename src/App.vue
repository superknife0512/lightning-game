<template>
  <div class="container">
    <div class="btn-group d-flex ">
      <router-link tag="a" class="btn btn-primary nav__link" to="/">
        Play Game
      </router-link>
      <router-link tag="a" class="btn btn-warning nav__link" to="/rank">
        Your rank
      </router-link>
    </div>
    <transition
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      mode="out-in">
      <router-view></router-view>
    </transition>
    </div>
</template>

<style lang="scss">
  .nav{
    &__link{
      justify-content: center;
      margin-right: 1.6rem;
      margin-top: 3rem;
      margin-bottom: 2rem;
    }
  }
</style>
