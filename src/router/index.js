import Vue from 'vue'
import Router from 'vue-router'
import Home from 'views/home/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: ()=>import('views/login/login')
    },
    {
        path:'/',
        name:'_home',
        redirect:'/entryRegistration',
        meta:{
            title:'入职登记',
            icon:'ios-clipboard-outline'
        },
        component:Home,
        children:[
            {
                path:'entryRegistration',
                name:'entryRegistration',
                meta:{
                    title:'入职登记',
                    isHide:true
                },
                component:() => import('views/entryRegistration/entryRegistration')
            },
            {
                path:'entryRegistrationList',
                name:'entryRegistrationList',
                meta:{
                    title:'人员管理',
                    isHide:true
                },
                component:() => import('views/entryRegistration/entryRegistrationList')
            }
        ]
    }
  ]
})
