import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import Fund from '@/pages/home/Fund'
import Business from '@/pages/home/Business'
import Financial from '@/pages/Financial'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: 'fund',
          name: 'Fund',
          component: Fund
        },
        {
          path: 'business',
          name: 'Business',
          component: Business
        }
      ]
    },
    {
      path: '/financial',
      name: 'Financial',
      component: Financial
    }
  ]
})
