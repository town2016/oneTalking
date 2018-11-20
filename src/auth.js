import React from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setAuth } from './store/user.redux'
import Cookie from 'js-cookie'
import axios from 'axios'
@withRouter
@connect(
  state => state.user,
  { setAuth }
)
class Auth extends React.Component {
  componentWillMount () {
    var userInfo = Cookie.get('userInfo') && JSON.parse(Cookie.get('userInfo'))
    var noAuth = ['/auth/register', '/hot', '/auth/login']
    if (!userInfo) {
      if (noAuth.indexOf(this.props.location.pathname) < 0) {
        this.props.history.push('/auth/login')
      }
    } else {
      if (noAuth.indexOf(this.props.location.pathname) < 0) {
        var params = {id: userInfo._id}
        axios.get('/user/getUserInfo', {params: params}).then(res => {
          if (res.data.code === global.dictionary.ERR_OK) {
            this.props.setAuth({isAuth: true, user: {...res.data.data}})
          } else {
            this.props.history.push('/auth/login')
          }
        })
      }
    }
  }
  render () {
    return null
  }
}

export default Auth