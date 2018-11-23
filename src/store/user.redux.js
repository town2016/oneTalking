import axios from 'axios'
const AUTH = 'auth'
const REGISTER_SUCCESS = 'register_success'
const ERROR_MSG = 'error_msg'
const LOGIN_SUCCESS = 'login_success'
export function user (state = {isAuth: false, redirectTo: ''}, action) {
  switch(action.type){
    case AUTH:
      return {...state, ...action}
    case REGISTER_SUCCESS: 
      delete action.type
      return {...state, redirectTo: '/auth/login'}
    case LOGIN_SUCCESS: 
      delete action.type
      return {...state,isAuth: true, redirectTo: '/hot', ...action}
    case ERROR_MSG: 
      delete action.type
      return {...state, ...action}
    default: 
      return state
  } 
}
// 保存登录用户信息
export function setAuth (obj) {
  return {type: AUTH, ...obj}
}
// 注册
export function register (params) {
  return dispatch => {
    axios.post('/user/add', params).then(res => {
      if (res.data.code === global.dictionary.ERR_OK) {
        dispatch({type: REGISTER_SUCCESS})
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
        dispatch({type: LOGIN_SUCCESS, ...res.data.data})
        sessionStorage.setItem('userInfo', JSON.stringify(res.data.data))
      } else {
        dispatch({type: ERROR_MSG, message: res.data.message})
      }
    })
  }
}

// 登出操作
export function logout () {
  return dispatch => {
    return axios.get('/user/logout')
  }
}

// 用户信息修改
export function userUpdate (params) {
  return dispatch => {
    return axios.post('/user/update', params)
  }
}

// 拉取用户信息
export function getUserInfo () {
  return dispatch => {
    return axios.get('/user/getUserInfo')
  }
}

// 从数据库中拉取用户信息
export function  getUserInfoFromDB () {
  return dispatch => {
    axios.get('/user/getUserInfoFromDB').then(res => {
      if (res.data.code === global.dictionary.ERR_OK) {
        dispatch({type: AUTH, ...res.data.data})
      } else {
        dispatch({type: ERROR_MSG, message: '拉取用户信息失败'})
      }
    })
  }
}
