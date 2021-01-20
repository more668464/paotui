import axios from '@/utils/request';

//分页查找
export function findAllProduct(params) {
    let obj = { ...params };
    obj.page--;
    return axios.post('/product/query', obj)
}
//删除
export function deleteById(params) {
    return axios.get('/product/deleteById', { params })
}
//批量删除
export function batchDelete(params) {
    return axios.post('/product/batchDelete', params)
}
//新增和修改
export function saveOrUpdate(params) {
    return axios.post('/product/saveOrUpdate', params)
}
//根据id找产品信息
export function findById(params) {
    return axios.get('/product/findById', { params })
}
