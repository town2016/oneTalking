import React from 'react'
import { headImgBg, avatar } from '../static/img/images'
import { Button, Modal } from 'antd-mobile'
import { connect } from 'react-redux'
import Auth from '../auth';
import '../static/less/my.less'
@connect(
  state => state.user
)
class My extends React.Component {
  constructor (props) {
    super(props)
    this.nickNameChange = this.nickNameChange.bind(this)
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
            {this.props.user && this.props.user.user ? <img src={this.props.user.user.avatar ? this.props.user.user.avatar : avatar} alt='head-img'/> : <img src={avatar} alt='head-img11'/>}
          </div>
        </div>
        <div className='func-list'>
          <ul>
            <li className='flex flex-pack-justify  flex-align-center' onClick={this.nickNameChange}>
              <span>昵称</span>
              <div>
                {this.props.user && this.props.user.user ? <span>{this.props.user.user.account ? this.props.user.user.account : ''}</span> : null}
                <span className='icon-right'></span>
              </div>
              
            </li>
            <li className='flex flex-pack-justify  flex-align-center'>
              <span>活跃指数</span>
              <div>
                {this.props.user && this.props.user.user ? 
                  active(this.props.user.user.dynamicCount >= 10 ? 5 : 
                  this.props.user.user.dynamicCount / 2) : 
                null}
              </div>
            </li>
            <li className='flex flex-pack-justify  flex-align-center'>
              <span>我的相册</span>
              <span className='icon-right'></span>
            </li>
            <li className='flex flex-pack-justify  flex-align-center'>
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
      {text: '确定', onPress: () => {}}
    ])
  }
}

export default My
