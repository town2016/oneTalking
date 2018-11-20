import React, {Component} from 'react'
import List from './list'
import Gallery  from './gallery'
import { setAuth } from '../store/user.redux'
import { connect } from 'react-redux'
import axios from 'axios'
@connect (
  state => state.user,
  { setAuth }
)
class Hot extends Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [],
      gallery: [],
      isShow: false,
      pageNumber: 1
    }
    this.openView = this.openView.bind(this)
    this.closeView = this.closeView.bind(this)
    this.getDynamicList = this.getDynamicList.bind(this)
  }
  componentDidMount () {
    this.props.setAuth({isAuth: true, user: this.props.user})
    this.getDynamicList()
  }
  render () {
    return (
      <div>
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
          list: res.data.data
        })
      }
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
}

export default Hot