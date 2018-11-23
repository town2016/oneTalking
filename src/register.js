import React from 'react'
import { logo } from './static/img/images'
import { connect } from 'react-redux'
import { register, errMsg, setAuth } from './store/user.redux'
import { Redirect, Link } from 'react-router-dom'
import { rules } from './static/js/validate'
import './static/less/register.less'
@connect(
  state => state.user,
  { register, errMsg, setAuth }
)
class Register extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      account: '',
      pwd: '',
      rePwd: ''
    }
    this.formValite = this.formValite.bind(this)
  }
  render () {
    return (
      <div className='register auth-wrapper'>
        {/* 注册成功之后跳转到登录页 */} 
        { (!this.props.isAuth && this.props.redirectTo) ? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <div className='logo'>
          <img src={logo} alt='logo'/>
        </div>
        <form id='registerForm'>
          <div className='form-group flex flex-align-center'>
            <label>邮箱</label>
            <div className='form-control flex-1'>
              <input placeholder='请输入邮箱' name='email' onChange={this.handlerChange.bind(this, 'email')} data-required data-email  />
            </div>
          </div>
          <div className='form-group flex flex-align-center'>
            <label>账号</label>
            <div className='form-control flex-1'>
              <input placeholder='请输入账号' name='account' onChange={this.handlerChange.bind(this, 'account')} data-required/>
            </div>
          </div>
          <div className='form-group flex flex-align-center'>
            <label>密码</label>
            <div className='form-control flex-1'>
              <input type='password' placeholder='请输入密码' name='pwd' onChange={this.handlerChange.bind(this, 'pwd')} data-required/>
            </div>
          </div>
          <div className='form-group flex flex-align-center'>
            <label>确认密码</label>
            <div className='form-control flex-1'>
              <input type='password' placeholder='请确认密码' name='rePwd' onChange={this.handlerChange.bind(this, 'rePwd')} data-required/>
            </div>
          </div>
        </form>
        <div className='tips'>
            {this.props.message}
        </div>
        <div className='btn-wrapper'>
          <button onClick={this.formValite} disabled={this.state.loading}>注册</button>
        </div>
        <div className='look-around'>
          <Link to='/auth/login' style={{display: 'inline-block', padding: '10px 0'}}>已有账号,去登陆</Link>
        </div>
      </div>
    )
  }

  formValite () {
    if (!rules.email(this.state.email)) {
      this.props.errMsg({message: '邮箱格式不正确'})
      return
    }
    if (!rules.required(this.state.account)) {
      this.props.errMsg({message: '账户不能为空'})
      return
    }
    if (!rules.required(this.state.pwd)) {
      this.props.errMsg({message: '密码不能为空'})
      return
    }
    if (this.state.pwd !== this.state.rePwd) {
      this.props.errMsg({message: '两次密码不一致'})
      return
    }
    this.props.errMsg({message: ''})
    var params = {
      email: this.state.email,
      account: this.state.account,
      pwd: this.state.pwd
    }
    this.props.register(params)
  }
  handlerChange (k, event) {
    var value = event.target.value
    this.setState({
      [k]: value
    })
  }
  // 组件卸载
  componentWillUnmount () {
    if (this.props.message) {
      this.props.setAuth({message: ''})
    }
  }
}

export default Register