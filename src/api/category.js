import axios from '@/utils/request';

//分页查询
export function findAllcategory(params) {
    let obj = { ...params };
    obj.page--;
    return axios.post('/category/query', obj)
}
//查找所有栏目
export function findAll() {
    return axios.get('/category/findAll')

}
//新增和编辑
export function saveOrUpdate(params) {
    return axios.post('/category/saveOrUpdate', params)
}

//根据id删除
export function deleteById(params) {
    return axios.get('/category/deleteById', { params })

}