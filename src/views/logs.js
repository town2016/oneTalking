import React from 'react'
import '../static/less/logs.less'
import { NavBar, Icon, Toast } from 'antd-mobile'
import axios from 'axios'
class Logs extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [],
      pageNumber: 0,
      isLoading: false,
      total: 0,
      totalNum: 0
    }
    this.getDynamicList = this.getDynamicList.bind(this)
  }
  render () {
    return (
      <div className='logs'>
        <div className='navBar'>
          <NavBar
            icon={<Icon type="left" />}
            onLeftClick={() => this.props.history.go(-1)}
            mode='light'
          >我的相册</NavBar>
        </div>
        <div className='list-wrapper'>
          <ul>
            {this.state.list.length ? this.state.list.map((item, index) => (
              <li className='log-item' key={index}>
                <p className='title'>{item.dynamic}</p>
                {item.imgList ? (
                  <div className='imgList clearfix'>
                    <ul>
                      {item.imgList.map((img, iIndex) => (
                        <li key={iIndex}><img src={img} alt='log-img'/></li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                <div className='operation-panel flex flex-pack-justify'>
                  <div className='operation-item flex-1 flex flex-pack-center flex-align-center'>
                    <span className='icon-appreciate_light'></span>{item.praises.length}
                  </div>
                  <div className='operation-item flex-1 flex flex-pack-center flex-align-center'>
                    <span className='icon-comment_light'></span>{item.comments.length}
                  </div>
                  <div className='operation-item flex-1 flex flex-pack-center flex-align-center' onClick={this.deleteDynamic.bind(this, item, index)}>
                    <span className='icon-delete'></span>
                  </div>
                </div>
              </li>
            )) : null}
          </ul>
        </div>
        {this.state.isLoading ? <div className='loading'>{ this.state.totalNum > this.state.pageNumber ? 'Loading......' : '加载完毕'}</div> : null}
      </div>
    )
  }
  componentDidMount () {
    this.getDynamicList()
    document.querySelector('.logs').addEventListener('scroll',  this.debounce(this.isToLoad.bind(this), 300), false)
  }
  // 更新动态列表
  getDynamicList () {
    var params = {
      pageNumber: (this.state.pageNumber + 1)
    }
    axios.get('/api/dynamicForUser', {params: params}).then(res => {
      if (res.data.code === global.dictionary.ERR_OK) {
        this.setState({
          list: this.state.list.concat(res.data.data.list),
          total: res.data.data.total,
          totalNum: res.data.data.totalNum,
          pageNumber: res.data.data.curNum
        })
      } else {
        Toast.fail(res.data.message, 1)
        setTimeout(() => {
          this.props.history.replace('/auth/login')
        }, 1000)
      }
      this.setState({
        isLoading: false
      })
    })
  }
  
  // 删除动态
  deleteDynamic (dynamic, index) {
    axios.get('/api/dynamicDelete', {params: {id: dynamic._id}})
    .then(res => {
      if (res.data.code === global.dictionary.ERR_OK) {
        var list = [...this.state.list]
        list.splice(index, 1)
        this.setState({
          list: list
        })
        Toast.success(res.data.message, 1)
      } else {
        Toast.fail(res.data.message, 2)
      }
    })
  }
  
  // 判断页面是否滚动到底部
  isToLoad () {
    var scrollTop = document.querySelector('.logs').scrollTop
    var scrollHeight = document.querySelector('.logs').scrollHeight
    var winHeigt = window.innerHeight
    
    if (scrollHeight <= (scrollTop + winHeigt)) {
      if (this.state.totalNum >= (this.state.pageNumber + 1)) {
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
        document.querySelector('.logs').scrollTop += 5
      }, 20)
    }
  }
  
}

export default Logs
