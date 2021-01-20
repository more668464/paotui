import axios from '@/utils/request'

export function findByCustomerId(params) {
    return axios.get('/address/findByCustomerId', { params })
}
export function deleteById(params) {
    return axios.get('/address/deleteById', { params })
}
export function saveOrUpdate(params) {
    return axios.post('/address/saveOrUpdate', params)
}
export function batchDelete(params) {
    return axios.post('/address/batchDelete', params)
}
