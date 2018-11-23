import React from 'react'
import '../static/less/list.less'
import {avatar, commentIcon} from '../static/img/images.js'
import moment from 'moment'
import {connect} from 'react-redux'
import {setGallery, pariseOrCancel} from '../store/hot.redux'
import { Toast } from 'antd-mobile'
@connect(
  null,
  {setGallery, pariseOrCancel}
)
class List extends React.Component {
  constructor (props) {
    super(props)
    this.openActiobSheet = this.openActiobSheet.bind(this)
    this.openImgView = this.openImgView.bind(this)
  }
  
  render () {
    return (
      <div className='list-wrapper'>
        <ul className='list-container'>
          {this.props.list.map((item, index) => (
            
            <li className='list-item flex' key={index}>
              <div className='avatar'>
                <img src={(item.user && item.user.avatar) ? item.user.avatar : avatar} alt='avatar'/>
              </div>
              
              <div className='flex-1 item-body'>

                <div className='item-top'>
                  <p className='name'>{item.user && item.user.account}</p>
                  <p className='title'>{item.dynamic}</p>
                  {(item.imgList && item.imgList.length !== 0) && 
                    <div className='item-content'>
                      { item.imgList.length > 1 &&
                        <ul className='imgList clearfix'>
                          {item.imgList.map((imgItem, imgIndex) => (
                            <li className='imgItem' key={imgIndex} onClick={this.openImgView.bind(this, imgIndex, item.imgList)}>
                              <img src={imgItem} alt='img'/>
                            </li>
                          ))}
                        </ul>
                      }
                      {item.imgList.length === 1 &&
                        <div className='img-border' onClick={this.openImgView.bind(this, 0, item.imgList)}>
                          <img src={item.imgList[0]} width='100%' alt='img'/>
                        </div>
                      }
                    </div>
                  }
                </div>
                {item.locations ? <p className='location'>{item.locations}</p> : null}
                <div className='item-bottom flex flex-pack-justify flex-align-center'>
                  <div className='times'>
                    {moment(new Date(item.createTime ? item.createTime : new Date().getTime())).format('MM-DD HH:mm:ss')}
                  </div>
                  <div className='action-air'>
                    <div className='action-sheet'>
                      <a href='void:;' onClick={this.pariseOrCancel.bind(this, item)}><span className='icon-appreciate_fill_light'></span>{!item.praise ? '点赞':'取消'}</a>
                      <a href='void:;'><span className='icon-comment_fill_light'></span>评论</a>
                    </div>
                    <div className='icon-wrapper' onClick={this.openActiobSheet}>
                      <img src={commentIcon} width='19px' alt='commentIcon'/>
                    </div>
                  </div>
                </div>
                
                {(item.praiseList || item.commentList) ?
                <div className='comment-wrapper'>
                  {(item.praiseList && item.praiseList.length > 0) &&
                    <div className='praise-air'>
                      <span className='icon-appreciate_fill_light'></span>
                      {item.praiseList.map((nameItem, index) => (
                        <span key={index}>{nameItem.name}</span>
                      ))}
                    </div>
                  }
                  <div className='comment-air'>
                    <ul className='comment-list'>
                      <li className='comment-item'>
                        <span className='commenter'>南方 : </span><span className='comment-text'>1231212412341243qwerqwrqwerqwrqwrqwrqwrqewrqwrqwer12</span>
                      </li>
                    </ul>
                  </div>
                </div> : null}
                
              </div>
              
            </li>
            
          ))}
        </ul>
      </div>
    )
  }
  
  // 打开点赞/评论操作面板
  openActiobSheet (e) {
    var actionSheet = e.target.parentNode.previousElementSibling
    actionSheet.classList.toggle('opend')
  }
  // 打开图片预览
  openImgView (index, imgList) {
    this.props.setGallery({imgList: imgList, curIndex: index})
    this.props.openView()
  }
  
  // 点赞 
  pariseOrCancel (dynamic) {
    this.props.pariseOrCancel({id: dynamic._id}).then(res => {
      if (res.data.code === global.dictionary.ERR_OK) {
        if (res.data.data === 'cancel') {
        }
      } else {
        Toast.fail(res.data.message, 2)
      }
    })
  }
}

export default List