import axios from 'axios'
const AUTH = 'auth'
const REGISTER_SUCCESS = 'register_success'
const ERROR_MSG = 'error_msg'
const LOGIN_SUCCESS = 'login_success'
export function user (state = {isAuth: false}, action) {
  switch(action.type){
    case AUTH:
      delete action.type
      console.log()
      return {...state, ...action}
    case REGISTER_SUCCESS: 
      delete action.type
      return {...state, redirectTo: '/auth/login', ...action}
    case LOGIN_SUCCESS: 
      delete action.type
      return {...state, isAuth: true, redirectTo: '/hot', ...action}
    case ERROR_MSG: 
      delete action.type
      return {...state, ...action}
    default: 
      return state
  } 
}
// 保存登录用户信息
export function setAuth (obj) {
  return {type: AUTH, user: {...obj}}
}
// 注册
export function register (params) {
  return dispatch => {
    axios.post('/user/add', params).then(res => {
      if (res.data.code === global.dictionary.ERR_OK) {
        dispatch({type: REGISTER_SUCCESS, user: res.data.data, message: res.data.message})
      } else {
        dispatch({type: ERROR_MSG, message: res.data.message})
      }
    })
  }
}
// 报错
export function errMsg (obj) {
  return {type: ERROR_MSG, ...obj}
}
// 登录
export function login (params) {
  return dispatch => {
    axios.post('/user/login', params).then(res => {
      if (res.data.code === global.dictionary.ERR_OK) {
        dispatch({type: LOGIN_SUCCESS, user: res.data.data, message: res.data.message})
      } else {
        dispatch({type: ERROR_MSG, message: res.data.message})
      }
    })
  }
}
