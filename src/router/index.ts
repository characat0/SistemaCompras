import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/treeview',
    name: 'arquitectura',
    component: () => import('@/views/Arquitectura.vue')
  },
  {
    path: '/modulos/compras',
    name: 'catalogocompras',
    component: () => import('@/views/CatalogoCompras.vue')
  },
  {
    path: '/modulos/parametros',
    name: 'catalogocompras',
    component: () => import('@/views/MantenimientoParametros.vue')
  },
  {
    path: '/modulos/reglas',
    name: 'catalogoreglas',
    component: () => import('@/views/CatalogoReglas.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
