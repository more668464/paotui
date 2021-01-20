import { orderQuery, queryPage, findAll, findById, sendOrder, confirmOrder, serviceCompleteOrder, cancelSendOrder, saveOrder } from '@/api/order'
import moment from 'moment'

export default {
    namespaced: true,
    state: {
        //客户id查找数据
        customerOrderQueryData: [],
        waiterOrderQueryData: [],
        //分页
        orderTotalData: {
            list: []
        },
        //总
        orderAllData: [],
        //分类数据
        paidTotalData: {
            list: []
        },
        sendTotalData: {
            list: []
        },
        receiveTotalData: {
            list: []
        },
        serviceTotalData: {
            list: []
        },
        confirmTotalData: {
            list: [],
            total: 0
        },
        accomplishTotalData: {
            list: []
        },
        //订单编号数据
        orderByIdData: { customer: {} }
    },
    getters: {
        //客户id数据
        customerOrderQueryData: state => {
            state.customerOrderQueryData.forEach((item) => {
                item.orderTime = moment(item.orderTime).format("YYYY-MM-DD  HH:mm:ss")
            });
            return state.customerOrderQueryData
        },

        waiterOrderQueryData: state => {
            state.waiterOrderQueryData.forEach((item) => {
                item.orderTime = moment(item.orderTime).format("YYYY-MM-DD  HH:mm:ss")
            });
            return state.waiterOrderQueryData
        },

        //总数据
        orderAllData: state => state.orderAllData,

        //分页全部数据
        orderData: state => {
            state.orderTotalData.list.forEach((item) => {
                item.orderTime = moment(item.orderTime).format("YYYY-MM-DD  HH:mm:ss")
                // console.log(item.orderTime)

            });
            return state.orderTotalData.list
        },
        total: state => state.orderTotalData.total,
        //分页所有分类数据
        paidData: state => {
            state.paidTotalData.list.forEach((item) => {
                item.orderTime = moment(item.orderTime).format("YYYY-MM-DD  HH:mm:ss")
                // console.log(item.orderTime)

            });
            return state.paidTotalData.list
        },
        paidTotal: state => state.paidTotalData.total,

        sendData: state => {
            state.sendTotalData.list.forEach((item) => {
                item.orderTime = moment(item.orderTime).format("YYYY-MM-DD  HH:mm:ss")
                // console.log(item.orderTime)

            });
            return state.sendTotalData.list
        },
        sendTotal: state => state.sendTotalData.total,

        receiveData: state => {
            state.receiveTotalData.list.forEach((item) => {
                item.orderTime = moment(item.orderTime).format("YYYY-MM-DD  HH:mm:ss")
                // console.log(item.orderTime)

            });
            return state.receiveTotalData.list
        },
        receiveTotal: state => state.receiveTotalData.total,

        serviceData: state => {
            state.serviceTotalData.list.forEach((item) => {
                item.orderTime = moment(item.orderTime).format("YYYY-MM-DD  HH:mm:ss")
                // console.log(item.orderTime)

            });
            return state.serviceTotalData.list
        },
        serviceTotal: state => state.serviceTotalData.total,


        confirmData: state => {
            state.confirmTotalData.list.forEach((item) => {
                item.orderTime = moment(item.orderTime).format("YYYY-MM-DD  HH:mm:ss")
                // console.log(item.orderTime)

            });
            return state.confirmTotalData.list
        },
        confirmTotal: state => state.confirmTotalData.total,

        accomplishData: state => {
            state.accomplishTotalData.list.forEach((item) => {
                item.orderTime = moment(item.orderTime).format("YYYY-MM-DD  HH:mm:ss")
                // console.log(item.orderTime)

            });
            return state.accomplishTotalData.list
        },
        accomplishTotal: state => state.accomplishTotalData.total,


        // res.data.forEach((item) => {
        //     item.orderTime = moment(item.orderTime).format("YYYY-MM-DD  HH:mm:ss")
        // })

        //订单编号数据
        orderByIdData: state => {
            state.orderByIdData.orderTime = moment(state.orderByIdData.orderTime).format("YYYY-MM-DD  HH:mm:ss")
            return state.orderByIdData
        },
    },
    mutations: {
        //客户id订单数据
        changeCustomerOrderQueryData(state, payload) {
            state.customerOrderQueryData = payload
        },
        //服务员id订单数据
        changeWaiterOrderQueryData(state, payload) {
            state.waiterOrderQueryData = payload

        },

        //订单总数据
        changeOrderAllData(state, payload) {
            state.orderAllData = payload
        },
        //分页所有数据
        changeOrderTotalData(state, payload) {
            state.orderTotalData = payload
        },
        //分页所有分类数据
        changePaidData(state, payload) {
            state.paidTotalData = payload
        },
        changeSendData(state, payload) {
            state.sendTotalData = payload
        },
        changeReceiveData(state, payload) {
            state.receiveTotalData = payload
        },
        changeServiceData(state, payload) {
            state.serviceTotalData = payload
        },
        changeConfirmData(state, payload) {
            state.confirmTotalData = payload
        },
        changeAccomplisData(state, payload) {
            state.accomplishTotalData = payload
        },

        //订单编号数据
        changeOrderData(state, payload) {
            state.orderByIdData = payload
        },

    },
    actions: {
        //根据id查找订单信息
        async orderQuery({ commit }, payload) {
            if (payload.type == "customer") {
                let res = await orderQuery({ customerId: payload.id });
                commit('changeCustomerOrderQueryData', res.data)
            }
            if (payload.type == "waiter") {
                let res = await orderQuery({ waiterId: payload.id });
                commit('changeWaiterOrderQueryData', res.data)
            }

        },

        //分页查找信息
        async queryPage({ commit }, payload) {
            let res = await queryPage(payload);
            let max = Math.ceil(res.data.total / payload.pageSize)
            if (payload.page > max && max > 0) {
                payload.page = max;
                let res = await queryPage(payload);
                if (payload.status === "") {
                    commit('changeOrderTotalData', res.data)
                }
                if (payload.status === "待支付") {
                    commit('changePaidData', res.data)
                };
                if (payload.status === "待派单") {
                    commit('changeSendData', res.data)
                };
                if (payload.status === "待接单") {
                    commit('changeReceiveData', res.data)
                };
                if (payload.status === "待服务") {
                    commit('changeServiceData', res.data)
                };
                if (payload.status === "待确认") {
                    commit('changeConfirmData', res.data)
                };
                if (payload.status === "已完成") {
                    commit('changeAccomplisData', res.data)
                }

            } else {
                if (payload.status === "") {
                    commit('changeOrderTotalData', res.data)
                }
                if (payload.status === "待支付") {
                    commit('changePaidData', res.data)
                };
                if (payload.status === "待派单") {
                    commit('changeSendData', res.data)
                };
                if (payload.status === "待接单") {
                    commit('changeReceiveData', res.data)
                };
                if (payload.status === "待服务") {
                    commit('changeServiceData', res.data)
                };
                if (payload.status === "待确认") {
                    commit('changeConfirmData', res.data)
                };
                if (payload.status === "已完成") {
                    commit('changeAccomplisData', res.data)
                };



            }
        },

        //订单总数据
        async findAll({ commit }) {
            let res = await findAll();
            commit('changeOrderAllData', res.data)
        },

        //根据订单编号找订单
        async findById({ commit }, payload) {
            let res = await findById({ id: payload });
            commit('changeOrderData', res.data)
        },
        //派单
        async sendOrder({ commit }, payload) {
            let res = await sendOrder(payload);
            console.log(res, '-----------------')
            return res
        },
        //服务结束
        async serviceCompleteOrder({ commit }, payload) {
            let res = await serviceCompleteOrder(payload);
        },
        //确认订单
        async confirmOrder({ commit }, payload) {
            let res = await confirmOrder(payload);
        },
        //取消派单
        async cancelSendOrder({ commit }, payload) {
            let res = await cancelSendOrder(payload);
        },
        //下单
        async saveOrder({ commit }, payload) {
            let res = await saveOrder(payload);
        },

    }
}