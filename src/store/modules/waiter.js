// 导入api内的方法或者axios
import { findAll, deleteById, saveOrUpdate, batchDelete, findWaiterById, detailsShou, queryShou, findAllData, refusauditing } from '@/api/waiter.js';
import { Notification } from 'element-ui';

// 配置Vuex结构
export default {
  // vuex中的store分成模块来管理 需要在index.js中引入每一个Vuex模块进行配置 为了解决不同模块命名冲突的问题  将不同模块的namespaced 全部开启 之后 在不同的页面中再使用getters，actions，mutations，state的时候 需要根据不同的模块名来获取
  namespaced: true,

  state: {
    waiterTotalData: {
      list: []
    },
    detailsShouData: [],
    waiterBaseData: {},
    queryShouTotalData: {},
    waiterAllData: []
  },
  getters: {
    total: state => state.waiterTotalData.total,
    waiterData: state => state.waiterTotalData.list,
    detailsShouData: state => state.detailsShouData,
    waiterBaseData: state => state.waiterBaseData,
    queryShouData: state => state.queryShouTotalData.list,
    queryShouTotal: state => state.queryShouTotalData.total,
    waiterAllData: state => state.waiterAllData
  },
  mutations: {
    changeWaiterTotalData(state, payload) {
      state.waiterTotalData = payload
    },
    // changeAddressData(state, payload) {
    //   state.addressData = payload
    // },
    //基本信息
    changeWaiterBaseData(state, payload) {
      state.waiterBaseData = payload
    },
    //分页id收益
    changeDetailsShouData(state, payload) {
      state.detailsShouData = payload
    },

    //分页所有收益
    changequeryShouData(state, payload) {
      state.queryShouTotalData = payload
    },
    //总数据
    changeWaiterAllData(state, payload) {
      state.waiterAllData = payload
    },

  },
  actions: {
    /**
     * 分页查找全部全部waiter信息
     */
    async findAll({ commit }, payload) {
      let res = await findAll(payload);
      let max = Math.ceil(res.data.total / payload.pageSize);
      //页码超了范围处理一下
      if (payload.page > max) {
        payload.page = max;
        let res = await findAll(payload);
        commit('changeWaiterTotalData', res.data)
      } else {
        commit('changeWaiterTotalData', res.data)


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
    // async findAddressByCustomerId({ commit }, payload) {
    //   let res = await findAddressByCustomerId(payload);
    //   commit('changeAddressData', res.data)
    // },
    /** 
     * 通过id找客户基本信息
    */
    async findWaiterById({ commit }, payload) {
      let res = await findWaiterById(payload);
      commit('changeWaiterBaseData', res.data)
    },
    //找id收益信息
    async detailsShou({ commit }, payload) {
      let res = await detailsShou(payload);
      commit('changeDetailsShouData', res.data)
    },

    //分页全部收益信息
    async queryShou({ commit }, payload) {
      let res = await queryShou(payload);

      commit('changequeryShouData', res.data)
    },

    //查找总数居
    async findAllData({ commit }, payload) {
      let res = await findAllData(payload);
      console.log(res.data)
      commit('changeWaiterAllData', res.data)
    },
    //审核拒绝
    async refusauditing({ commit }, payload) {
      let res = await refusauditing(payload);
    },

  }
}