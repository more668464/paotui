// 导入api内的方法或者axios
import { findAll, deleteById, saveOrUpdate, batchDelete, findCustomerById } from '@/api/customer.js';
import { Notification } from 'element-ui';
import { findByCustomerId as findAddressByCustomerId, saveOrUpdate as saveOrUpdateAddress, batchDelete as batchDeleteAddress } from '@/api/address'

// 配置Vuex结构
export default {
  // vuex中的store分成模块来管理 需要在index.js中引入每一个Vuex模块进行配置 为了解决不同模块命名冲突的问题  将不同模块的namespaced 全部开启 之后 在不同的页面中再使用getters，actions，mutations，state的时候 需要根据不同的模块名来获取
  namespaced: true,

  state: {
    customerTotalData: {},
    addressData: [],
    customerBaseData: {}
  },
  getters: {
    total: state => state.customerTotalData.total,
    customerData: state => state.customerTotalData.list,
    addressData: state => state.addressData,
    customerBaseData: state => state.customerBaseData
  },
  mutations: {
    changeCustomerTotalData(state, payload) {
      state.customerTotalData = payload
    },
    changeAddressData(state, payload) {
      state.addressData = payload
    },
    changeCustomerBaseData(state, payload) {
      state.customerBaseData = payload
    }
  },
  actions: {
    /**
     * 查找全部全部顾客信息
     */
    async findAll({ commit }, payload) {
      let res = await findAll(payload);
      let max = Math.ceil(res.data.total / payload.pageSize);
      //页码超了范围处理一下
      if (payload.page > max) {
        payload.page = max;
        let res = await findAll(payload);
        commit('changeCustomerTotalData', res.data)
      } else {
        commit('changeCustomerTotalData', res.data)


      }
    },
    /** 
     * 删除
    */
    async deleteById({ commit, dispatch }, payload) {
      let res = await deleteById({ id: payload.id });
      console.log(payload.id)
      dispatch('findAll', payload.queryParams)
    },

    /** 
     * 新增/修改
    */
    async saveOrUpdate({ commit, dispatch }, payload) {
      //发请求
      let res = await saveOrUpdate(payload.form)
      //提示用户成功
      if (res.status === 200) {
        Notification({
          title: '成功',
          message: '保存成功',
          type: 'success'
        });
        //找当前页数据
        dispatch('findAll', payload.queryParams)
      } else {
        Notification({
          title: '错误',
          message: '保存失败'
        })
      };
      //处理page
      //分发findAll
    },

    /** 
     *批量删除
    */
    async batchDelete({ dispatch }, payload) {
      let res = await batchDelete({ ids: payload.ids });
      dispatch('findAll', payload.queryParams)
    },
    /** 
     * 通过id找顾客地址信息
    */
    async findAddressByCustomerId({ commit }, payload) {
      let res = await findAddressByCustomerId(payload);
      commit('changeAddressData', res.data)
    },
    /** 
     * 保存和更新顾客地址信息
    */
    async saveOrUpdateAddress({ commit }, payload) {
      let res = await saveOrUpdateAddress({ ...payload.form, customerId: payload.customerId });
      console.log(payload, '=============')
    },
    /** 
     * 批量删除顾客地址信息
    */
    async batchDeleteAddress({ commit }, payload) {
      let res = await batchDeleteAddress(payload);
    },

    /** 
     * 通过id找客户基本信息
    */
    async findCustomerById({ commit }, payload) {
      let res = await findCustomerById(payload);
      commit('changeCustomerBaseData', res.data)
    },
  }
}