// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/public/iviewComponents'
import store from '@/store'

import { Cascader,Table ,
    TableColumn,Button,  Checkbox } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Cascader).use(Table).use(TableColumn).use(Button).use(Checkbox);

import '@/styles/index.less'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
