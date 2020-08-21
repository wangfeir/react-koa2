/*
 * @description: 
 * @param: 
 * @author: Fei
 * @return: 
 * @Date: 2020-08-21 15:54:51
 */
import axios from 'axios'
// 创建 axios 实例
const service = axios.create({
  baseURL: '/', // api base_url
  withCredentials: true,
  timeout: 300000, // 请求超时时间
  maxContentLength: 2048000000
})
const err = (data)=>{
  console.error(data)
}
service.interceptors.response.use((response) => {
  return response.data
}, err)

function requests(options = {}) {
  return service.request({ ...options })
}
export { service as VueAxios, requests as axios }
