// 在api中 需要处理网路请求 我们就需要导入axios 
// @ 以根目录的方式定义相对路径 想到与src/
import axios from '@/utils/request.js'

/** 
 * 分页查找所有的员工信息
 * @param Object params
 * @results Promise对象
*/
export function findAll(params) {
    let obj = { ...params };
    obj.page--;
    for (let key in obj) {
        if (obj[key] === 0) {  //如果是==，空字符串==0
            continue;
        }
        if (!obj[key]) {
            delete obj[key]
        }
    }
    return axios.post('/waiter/query', obj)
}

//删除
export function deleteById(params) {
    return axios.get('/waiter/deleteById', { params })
}
//批量删除
export function batchDelete(params) {
    return axios.post('/waiter/batchDelete', params)
}
//新增和修改
export function saveOrUpdate(params) {
    return axios.post('/waiter/saveOrUpdate', params)
}
//通过id找基本信息
export function findWaiterById(params) {
    return axios.get('/waiter/findWaiterById', { params })
}

//根据id找收益信息
export function detailsShou(params) {
    return axios.get('/waiter/detailsShou', { params })
}

//分页查找体现信息
export function queryShou(params) {
    let obj = { ...params };
    obj.page--;
    return axios.post('/waiter/queryShou', obj)
}
//找总waiter数据
export function findAllData() {
    return axios.get('/waiter/findAll')
}

//拒绝审核
export function refusauditing(params) {
    return axios.post('/waiter/refusauditing', params)
}
