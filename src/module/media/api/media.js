import http from './../../../base/api/public'
import querystring from 'querystring'
import Cookies from 'js-cookie'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;

/*页面列表*/
export const media_list = (page,size,params) => {
  //params为json格式
  //使用querystring将json对象转成key/value串
  //let querys = querystring.stringify(params)
  //return http.requestQuickGet(apiUrl+'/consumer/list/'+page+'/'+size+'/?'+querys)

  return http.requestPost(apiUrl+'/consumer/list/'+page+'/'+size+'/',params)
}
export const media_img = (params) => {
  return http.requestPost(apiUrl+'/consumer/img',params)
}
export const media_update = (id,params) => {
  return http.requestPut(apiUrl+'/consumer/update/'+id+"/"+params)
}
export const media_delete = (id) => {
  return http.requestDelete(apiUrl+'/consumer/delete/'+id)
}
