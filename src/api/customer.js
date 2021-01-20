// 在api中 需要处理网路请求 我们就需要导入axios 
// @ 以根目录的方式定义相对路径 想到与src/
import axios from '@/utils/request.js'

/** 
 * 查找所有的顾客信息
 * @param Object params
 * @results Promise对象
*/
export function findAll(params) {
    let obj = { ...params };
    obj.page--;
    //遍历对象 for in
    //object。keys 返回数组
    for (let key in obj) {
        if (obj[key] === 0) {  //如果是==，空字符串==0
            continue;
        }
        if (!obj[key]) {
            delete obj[key]
        }
    }
    return axios.post('/customer/query', obj)
}

//删除
export function deleteById(params) {
    return axios.get('/customer/deleteById', { params })
}
//批量删除
export function batchDelete(params) {
    return axios.post('/customer/batchDelete', params)
}
//新增和修改
export function saveOrUpdate(params) {
    return axios.post('/customer/saveOrUpdate', params)
}
//通过id找基本信息
export function findCustomerById(params) {
    return axios.get('/customer/findCustomerById', { params })
}