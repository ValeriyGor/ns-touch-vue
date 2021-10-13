import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ShowTouch from '../views/ShowTouch'
import ShowCombo from '../views/ShowCombo'
import ShowOrder from '../views/ShowOrder'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/show-touch/:artikul',
    name: 'ShowTouch',
    component: ShowTouch
  },
  {
    path: '/show-order',
    name: 'ShowOrder',
    component: ShowOrder
  },
  {
    path: '/show-combo/:artikul',
    name: 'ShowCombo',
    component: ShowCombo
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
