import Vue from 'vue'
import Router from 'vue-router'
import Reverser from '@/components/Reverser'
import Leaderboard from '@/components/Leaderboard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Leaderboard',
      component: Leaderboard
    },
    {
      path: '/reverser',
      name: 'Reverser',
      component: Reverser
    }
  ]
})
