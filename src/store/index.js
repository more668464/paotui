import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
// 导入customer
import customer from './modules/customer'
import product from './modules/product'
import category from './modules/category'
import order from './modules/order'
import waiter from './modules/waiter'
import comment from './modules/comment'


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    // customer模块
    customer,
    product,
    category,
    order,
    waiter,
    comment
  },
  getters
})

export default store
