import { findAll, findAllcategory, saveOrUpdate } from '@/api/category';


export default {
    namespaced: true,
    state: {
        categoryTotalData: {},
        AllData: {},
        //所有父栏目
        parents: []
    },
    getters: {
        categoryData: state => state.categoryTotalData.list,
        total: state => state.categoryTotalData.total,
        categoryAllData: state => state.AllData.data,
        parents: state => state.parents
    },
    mutations: {
        //所有分页数据
        changeCategoryTotalData(state, payload) {
            state.categoryTotalData = payload
        },
        //所有数据
        changeCategoryAllData(state, payload) {
            state.AllData = payload
        },
        ///过滤出父栏目
        changeParents(state, payload) {
            state.parents = state.AllData.data.filter((item) => {
                return item.parentId == null;
            });
        }
    },
    actions: {
        //分页查询
        async findAllcategory({ commit, dispatch }, payload) {
            let res = await findAllcategory(payload);
            let max = Math.ceil(res.data.total / payload.pageSize);
            //页码超了范围处理一下
            if (payload.page > max) {
                payload.page = max;
                let res = await findAllcategory(payload);
                commit('changeCategoryTotalData', res.data);

            } else {
                commit('changeCategoryTotalData', res.data);

            }

        },
        //查找全部
        async findAll({ commit }) {
            let res = await findAll();
            commit('changeCategoryAllData', res)
            commit('changeParents')

        },
        //保存和更新
        async saveOrUpdate({ dispatch }, payload) {
            let res = await saveOrUpdate(payload.form);
            dispatch('findAllcategory', payload.queryParams)
        }

    }
}