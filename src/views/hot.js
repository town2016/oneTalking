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
        {url: 'https://f11.baidu.com/it/u=3087422712,1174175413&fm=72'}
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
            gallery={this.state.list[0].imgList}
            goIndex={this.state.galleryIndex}
            isShow={this.state.isShow}
            closeView={this.closeView}
          />
        }
      </div>
    )
  }
  
  openView (index) {
    this.setState({
      isShow: true,
      galleryIndex: index
    })
  }
  
  closeView () {
    this.setState({
      isShow: false
    })
  }
}

export default Hot