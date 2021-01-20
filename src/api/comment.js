import axios from '@/utils/request';

//分页查询
export function findAllcomment(params) {
    let obj = { ...params };
    obj.page--;
    return axios.post('/comment/query', obj)
}

//新增和编辑
export function saveOrUpdate(params) {
    return axios.post('/comment/saveOrUpdate', params)
}

//根据id删除
export function deleteById(params) {
    return axios.get('/comment/deleteById', { params })

}
//批量删除
export function batchDelete(params) {
    return axios.post('/comment/batchDelete', params)
}

//通过审核
export function commentExamine(params) {
    return axios.get('/comment/commentExamine', { params })
}
//拒绝审核
export function commentRefuseExamine(params) {
    return axios.get('/comment/commentRefuseExamine', { params })
}
//通过客户id找评论
export function findCommentByCus(params) {
    return axios.get('/comment/findCommentByCus', { params })
}
