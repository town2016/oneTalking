import React, {Component} from 'react'
import List from './list'
import Gallery  from './gallery'
import { connect } from 'react-redux'
import { setAuth, getUserInfo } from '../store/user.redux'
import { NavBar } from 'antd-mobile'
import axios from 'axios'
@connect (
  state => state.user,
  { setAuth, getUserInfo }
)
class Hot extends Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [],
      gallery: [],
      isShow: false,
      pageNumber: 1,
      isLoading: false,
      total: 0,
      totalNum: 0
    }
    this.openView = this.openView.bind(this)
    this.closeView = this.closeView.bind(this)
    this.getDynamicList = this.getDynamicList.bind(this)
    this.goCenter = this.goCenter.bind(this)
  }
  componentDidMount () {
    this.getDynamicList()
    this.props.setAuth({redirectTo: ''})
    window.addEventListener('scroll',  this.debounce(this.isToLoad.bind(this), 300), false)
  }
  render () {
    return (
      <div>
        <div className='navBar'>
          <NavBar
            mode="light"
            rightContent={[
              <span key='user' className='icon-round_people_fill' onClick={this.goCenter}></span>
            ]}
          >曰 一</NavBar>
        </div>
        <List
          list={this.state.list}
          openView={this.openView}
        />
        {this.state.isShow && 
          <Gallery 
            isShow={this.state.isShow}
            closeView={this.closeView}
          />
        }
      </div>
    )
  }
  // 更新动态列表
  getDynamicList () {
    var params = {
      pageNumber: this.state.pageNumber
    }
    axios.get('/api/dynamicList', {params: params}).then(res => {
      if (res.data.code === global.dictionary.ERR_OK) {
        this.setState({
          list: this.state.list.concat(res.data.data.list),
          total: res.data.data.total,
          totalNum: res.data.data.totalNum
        })
      }
      this.setState({
        isLoading: false
      })
    })
  }
  // 打开图片预览窗口
  openView (index) {
    this.setState({
      isShow: true
    })
  }
  // 关闭图片预览窗口
  closeView () {
    this.setState({
      isShow: false
    })
  }
  // 跳转到用户信息页
  goCenter () {
    this.props.getUserInfo().then(res => {
      if (res.data.code === global.dictionary.ERR_OK) {
        this.props.history.push('/logs')
      } else {
        this.props.history.replace('/auth/login')
      }
    })
  }
  // 判断页面是否滚动到底部
  isToLoad () {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    var scrollHeight = document.documentElement.scrollHeight
    var winHeigt = window.innerHeight
    if (scrollHeight <= (scrollTop + winHeigt)) {
      if (this.state.totalNum >= (this.state.pageNumber + 1)) {
        this.setState({
          pageNumber: ++this.state.pageNumber
        })
        if (!this.state.isLoading) {
          this.getDynamicList()
          this.setState({
            isLoading: true
          })
        }
      }
    }
  }
  
  debounce(fn, wait) {
    var timer = null;
    return function () {
        var context = this
        var args = arguments
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(function () {
            fn.apply(context, args)
        }, wait)
    }
  }
  
  componentDidUpdate () {
    if (this.state.pageNumber > 1) {
      var duration = 0
      var timer = setInterval(() => {
        if (duration>=50) {
          window.clearInterval(timer)
          return
        }
        duration += 5
        document.documentElement.scrollTop += 5
      }, 20)
    }
  }
  
}

export default Hot