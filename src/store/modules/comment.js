import { batchDelete, findAllcomment, saveOrUpdate, commentExamine, commentRefuseExamine, findCommentByCus } from '@/api/comment';
import moment from 'moment'

export default {
    namespaced: true,
    state: {
        commentTotalData: {},
        AllData: {},
        //顾客评论
        cusComment: { list: [] }
    },
    getters: {
        commentData: state => state.commentTotalData.list,
        total: state => state.commentTotalData.total,
        cusComment: state => {
            state.cusComment.list.forEach(item => {
                item.commentTime = moment(item.commentTime).format("YYYY-MM-DD  HH:mm:ss")
            })
            return state.cusComment.list
        }
    },
    mutations: {
        //所有分页数据
        changecommentTotalData(state, payload) {
            state.commentTotalData = payload
        },
        changeCusComment(state, payload) {
            state.cusComment = payload
            // console.log(state.cusComment, '==============================')
        },
    },
    actions: {
        //分页查询
        async findAllcomment({ commit, dispatch }, payload) {
            let res = await findAllcomment(payload);
            let max = Math.ceil(res.data.total / payload.pageSize);
            //页码超了范围处理一下
            if (payload.page > max) {
                payload.page = max;
                let res = await findAllcomment(payload);
                commit('changecommentTotalData', res.data);

            } else {
                commit('changecommentTotalData', res.data);

            }

        },
        //保存和更新
        async saveOrUpdate({ dispatch }, payload) {
            let res = await saveOrUpdate(payload.form);
            dispatch('findAllcomment', payload.queryParams)
        },

        //批量删除
        async batchDelete({ dispatch }, payload) {
            let res = await batchDelete({ ids: payload.ids });
            dispatch('findAllcomment', payload.queryParams)
        },
        //通过审核
        async commentExamine({ dispatch }, payload) {
            let res = await commentExamine({ commentid: payload });
        },
        //拒绝审核
        async commentRefuseExamine({ dispatch }, payload) {
            let res = await commentRefuseExamine({ commentid: payload });
        },
        //通过客户id找评论
        async findCommentByCus({ commit }, payload) {
            let res = await findCommentByCus({ cusId: payload });
            commit('changeCusComment', res.data);


        },
    }
}