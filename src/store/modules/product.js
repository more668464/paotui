import { findAllProduct, batchDelete, saveOrUpdate, deleteById, findById } from '@/api/product';

export default {
    namespaced: true,
    state: {
        productTotalData: {},
        productIdData: {}
    },
    getters: {
        productData: state => state.productTotalData.list,
        total: state => state.productTotalData.total,
        productIdData: state => state.productIdData
    },
    mutations: {
        changeproductTotalData(state, payload) {
            state.productTotalData = payload
        },
        changeProductIdData(state, payload) {
            state.productIdData = payload
        }
    },
    actions: {
        //查找所有
        async findAllProduct({ commit }, payload) {
            let res = await findAllProduct(payload);
            //页码超出时处理一下page
            let max = Math.ceil(res.data.total / payload.pageSize);
            if (payload.page > max) {
                payload.page = max;
                let res = await findAllProduct(payload);
                commit('changeproductTotalData', res.data)

            } else {
                commit('changeproductTotalData', res.data)

            }
        },
        //删除
        async deleteById({ dispatch }, payload) {
            let res = await deleteById({ id: payload.id });
            dispatch('findAllProduct', payload.queryParams)
        },
        //批量删除
        async batchDelete({ dispatch }, payload) {
            let res = await batchDelete({ ids: payload.ids });
            dispatch('findAllProduct', payload.queryParams)
        },
        //新增修改
        async saveOrUpdate({ dispatch }, payload) {
            let res = await saveOrUpdate(payload.form);
            dispatch('findAllProduct', payload.queryParams)

        },
        //根据id查找产品信息findById
        async findById({ commit }, payload) {
            let res = await findById({ id: payload });
            commit('changeProductIdData', res.data)

        },

    }
}