import http from './../../../base/api/public'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;
import querystring from 'querystring'
import qs from 'qs'
/*登陆*/
export const login = params => {
  //let loginRequest = querystring.stringify(params)
  //let loginRequest = qs.stringify(params);
  return http.requestPost(apiUrl+"/api/login",params);
}
/*退出*/
export const logout = params => {
  sessionStorage.removeItem('activeUser');
  return http.requestPost('/auth/userlogout');
}



