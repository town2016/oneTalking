import React from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setAuth, getUserInfo } from './store/user.redux'
import axios from 'axios'
import Cookie from 'js-cookie'
@withRouter
@connect(
  state => state.user,
  { setAuth, getUserInfo }
)
class Auth extends React.Component {
  componentWillMount () {
    var noAuth = ['/auth/register', '/hot', '/auth/login']
    if (noAuth.indexOf(this.props.location.pathname) < 0) {
      var userInfo = sessionStorage.getItem('userInfo')
      userInfo = userInfo ? JSON.parse(userInfo) : userInfo
      if (!userInfo || !userInfo._id) {
        this.props.history.replace('/auth/login')
        return
      }
      this.props.getUserInfo().then(res => {
        if (res.data.code === global.dictionary.ERR_OK) {
          this.props.setAuth({isAuth: true})
        } else {
          this.props.setAuth({isAuth: false, redirectTo: ''})
          this.props.history.replace('/auth/login')
        }
      })
    }
  }
  render () {
    return null
  }
}
export default Auth
