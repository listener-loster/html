import Vue from 'vue'
import Router from 'vue-router'
import Product from '@/components/Product'
import Login from '@/components/Login'
import Userlist from '@/components/Userlist'
import EWallet from '@/components/account/EWallet'
import Cart from '@/components/cart/Cart.vue'
import Pay from '@/components/cart/Pay.vue'
import UserSetting from '@/components/UserSetting'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Product',
      component: Product
    },
    {
      path: '/EWallet',
      name: 'EWallet',
      component: EWallet
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Userlist',
      name: 'Userlist',
      component: Userlist
    },
    {
      path: '/UserSetting',
      name: 'UserSetting',
      component: UserSetting
    },
    {
       path: '/Cart',
       name: 'Cart',
       component: Cart
    },
    {
       path: '/Pay',
       name: 'Pay',
       component: Pay
    },
  ]
})
