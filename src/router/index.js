import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/create',
    name: 'Create',
    component: () => import('../views/Create.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/calculator',
    name: 'Calculator',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Calculator.vue')
  },
  {
    path: '/savings',
    name: 'Savings',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Savings.vue')
  },
  {
    path: '/probonoform',
    name: 'ProBonoForm',
    component: () => import('../views/Forms/ProBono.vue')
  },
  {
    path: '/userform',
    name: 'UserForm',
    component: () => import('../views/Forms/User.vue')
  },
  
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Chart.vue')
  },

  {
    path: '/financialadvisors',
    name: 'FinancialAdvisors',
    component: () => import('../views/FinancialAdvisors.vue')
  },
  {
    path: '/',
    name: 'Homepage',
    component: () => import('../views/Homepage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
