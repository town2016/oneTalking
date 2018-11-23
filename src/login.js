import React from 'react'
import { logo } from './static/img/images'
import { connect } from 'react-redux'
import { login, errMsg, setAuth } from './store/user.redux'
import { Redirect, Link } from 'react-router-dom'
import { rules } from './static/js/validate'
import './static/less/register.less'
@connect(
  state => state.user,
  { login, errMsg, setAuth }
)
class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      account: '',
      pwd: ''
    }
    sessionStorage.clear()
    this.formValite = this.formValite.bind(this)
    this.goHot = this.goHot.bind(this)
  }
  render () {
    return (
      <div className='register auth-wrapper'> 
        { this.props.isAuth && this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <div className='logo'>
          <img src={logo} alt='logo'/>
        </div>
        <form id='registerForm'>
          <div className='form-group flex flex-align-center'>
            <label>账号</label>
            <div className='form-control flex-1'>
              <input placeholder='请输入账号' name='account' onChange={this.handlerChange.bind(this, 'account')} />
            </div>
          </div>
          <div className='form-group flex flex-align-center'>
            <label>密码</label>
            <div className='form-control flex-1'>
              <input type='password' placeholder='请输入密码' name='pwd' onChange={this.handlerChange.bind(this, 'pwd')}/>
            </div>
          </div>
        </form>
        <div className='tips'>
            {this.props.message}
        </div>
        <div className='btn-wrapper'>
          <button onClick={this.formValite} disabled={this.state.loading}>登录</button>
          <div className='flex flex-pack-justify'>
            <Link to='/auth/register' className='a-link'>注册</Link>
            <Link to='/auth/register' className='a-link'>忘记密码</Link>
          </div>
        </div>
        <div className='look-around'>
          <Link to='/hot'>~随便看看~</Link>
        </div>
      </div>
    )
  }
  
  // 添加返回时间监听
  componentDidMount () {
    window.addEventListener('popstate',(event) => {
      /*if (this.props.location.pathname === '/auth/login') {
        window.history.forward();
        this.goHot()
      }*/
    })
  }
  
  // 返回
  goHot () {
    this.props.history.push('/hot')
  } 
  // 表单验证
  formValite () {
    if (!rules.required(this.state.account)) {
      this.props.errMsg({message: '账户不能为空'})
      return
    }
    if (!rules.required(this.state.pwd)) {
      this.props.errMsg({message: '密码不能为空'})
      return
    }
    this.props.errMsg({message: ''})
    var params = {
      email: this.state.email,
      account: this.state.account,
      pwd: this.state.pwd
    }
    this.props.login(params)
  }
  // 表单赋值
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

export default Login
