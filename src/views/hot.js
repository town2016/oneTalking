import React, {Component} from 'react'
import List from './list'
import Gallery  from './gallery'
class Hot extends Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [{a: 1,imgList: [
        {url: 'https://f10.baidu.com/it/u=2465775762,1509670197&fm=72'},
        {url: 'https://f12.baidu.com/it/u=642753244,1588215304&fm=72'},
        {url: 'http://img.zcool.cn/community/01cb11599aaeea0000002129536e52.gif'}
       ]
      }],
      gallery: [],
      isShow: false,
      galleryIndex: 0
    }
    this.openView = this.openView.bind(this)
    this.closeView = this.closeView.bind(this)
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
  
  openView (index) {
    this.setState({
      isShow: true
    })
  }
  
  closeView () {
    this.setState({
      isShow: false
    })
  }
}

export default Hot