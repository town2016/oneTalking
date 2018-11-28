import React from 'react'
import { headImgBg, avatar } from '../static/img/images'
import { Modal, Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import { userUpdate, setAuth, logout, getUserInfoFromDB } from '../store/user.redux'
import Auth from '../auth';
import '../static/less/my.less'
import axios from 'axios'
@connect(
  state => state,
  { userUpdate, setAuth, logout, getUserInfoFromDB }
)
class My extends React.Component {
  constructor (props) {
    super(props)
    this.nickNameChange = this.nickNameChange.bind(this)
    this.signOut = this.signOut.bind(this)
    this.props.getUserInfoFromDB()
  }
  render () {
    // 创建活跃指数的星标
    const active = (len) => {
      var res = []
      for (var i = 0; i < len; i++) {
        res.push(<span className='icon-favor_fill' key={i}></span>)
      }
      return res
    }
    
    return (
      <div className='my'>
        <Auth/>
        <div className='head-img'>
          <div className='mask'></div>
          <div className='head-img-bg'>
            <img src={headImgBg} alt='head-img-bg'/>
          </div>
          <div className='head-img-icon'>
            <div className='upload-control'>
              <form id='avatarForm'>
                <input type='file' name='files' accept="image/*" onChange={this.avatarChange.bind(this)}/>
              </form>
            </div>
            {this.props.user ? <img src={this.props.user.avatar ? this.props.user.avatar : avatar} alt='head-img'/> : <img src={avatar} alt='head-img11'/>}
          </div>
        </div>
        <div className='func-list'>
          <ul>
            <li className='flex flex-pack-justify  flex-align-center' onClick={this.nickNameChange}>
              <span>昵称</span>
              <div>
                {this.props.user ? <span>{this.props.user.account ? this.props.user.account : ''}</span> : null}
                <span className='icon-right'></span>
              </div>
              
            </li>
            <li className='flex flex-pack-justify  flex-align-center'>
              <span>活跃指数</span>
              <div>
                {this.props.user ? 
                  active(this.props.user.dynamicCount >= 10 ? 5 : 
                  this.props.user.dynamicCount / 2) : 
                null}
              </div>
            </li>
            <li className='flex flex-pack-justify  flex-align-center' onClick={this.goToLogs.bind(this)}>
              <span>我的相册</span>
              <span className='icon-right'></span>
            </li>
            <li className='flex flex-pack-justify  flex-align-center' onClick={this.signOut}>
              <span>退出登录</span>
              <span className='icon-right'></span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
  // 改变昵称
  nickNameChange () {
    Modal.prompt('', '', [
      {text: '取消', onPress: () => {}},
      {text: '确定', onPress: (value) => {
        let user = this.props.user
        if (value === user.account) {
          return 
        }
        let params = {
          account: value
        }
        this.props.userUpdate(params).then(res => {
          this.props.setAuth({...res.data.data})
        })
      }}
    ], 'default', this.props.user.account)
  }
  // 登出
  signOut () {
    this.props.logout().then(res => {
      if (res.data.code === global.dictionary.ERR_OK) {
        global.dictionary.clearCookie()
        this.props.history.replace('/auth/login')
      } else {
        Toast.fail(res.data.message, 2)
      }
    })
  }
  // 更新头像
  avatarChange (event) {
    var formData = new FormData(document.getElementById('avatarForm'))
    axios.post('/api/fileUpload', formData).then(res => {
      if (res.data.code === global.dictionary.ERR_OK) {
        let params = {
          avatar: res.data.data[0]
        }
        this.props.userUpdate(params).then(res => {
          this.props.setAuth({...res.data.data})
        })
      } else {
        Toast.fail(res.data.message, 2, null, false)
      }
    })
  }
  // 跳转到日子列表页
  goToLogs () {
    this.props.history.push('/logs')
  }
}

export default My
