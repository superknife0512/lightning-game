import Vue from 'vue';
import Router from 'vue-router';
import Game from './views/Game.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Game',
      component: Game,
    },
    {
      path: '/rank',
      name: 'Ranking',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Ranking.vue'),
    },
  ],
});
