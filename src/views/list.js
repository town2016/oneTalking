import React from 'react'
import '../static/less/list.less'
import {avatar, commentIcon} from '../static/img/images.js'
import moment from 'moment'
import {connect} from 'react-redux'
import {setGallery, pariseOrCancel, saveComment} from '../store/hot.redux'
import { Toast, Modal } from 'antd-mobile'
import { eventHandler } from '../static/js/common'
const confirm = Modal.prompt
@connect(
  null,
  {setGallery, pariseOrCancel, saveComment}
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
                      <a href='void:;' onClick={this.pariseOrCancel.bind(this, item, index)}><span className='icon-appreciate_fill_light'></span>{!item.praised.length > 0 ? '点赞':'取消'}</a>
                      <a href='void:;' onClick={this.comment.bind(this, item, index)}><span className='icon-comment_fill_light'></span>评论</a>
                    </div>
                    <div className='icon-wrapper' onClick={this.openActiobSheet}>
                      <img src={commentIcon} width='19px' alt='commentIcon'/>
                    </div>
                  </div>
                </div>
                
                {((item.praises && item.praises.length > 0)  || (item.comments && item.comments.length > 0)) ?
                <div className='comment-wrapper'>
                  {(item.praises && item.praises.length > 0) &&
                    <div className='praise-air'>
                      <span className='icon-appreciate_fill_light'></span>
                      {item.praises.map((user, index) => (
                        <span key={index}>{user.account}</span>
                      ))}
                    </div>
                  }
                  {(item.comments && item.comments.length > 0) && 
                    <div className='comment-air'>
                      <ul className='comment-list'>
                        {item.comments.map((comment, index) => (
                          <li className='comment-item' key={index}>
                            <span className='commenter'>{comment.userName} : </span>
                            <span className='comment-text'>{comment.content}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  }
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
  pariseOrCancel (dynamic, index, event) {
    var actionSheet = eventHandler.getParent(event.target, '.action-sheet')
    this.props.pariseOrCancel({id: dynamic._id}).then(res => {
      if (res.data.code === global.dictionary.ERR_OK) {
        // Toast.info(res.data.message, 1)
        actionSheet.classList.remove('opend')
        this.props.updatePraise(index, res.data.data)
      } else {
        Toast.fail(res.data.message, 2)
      }
    })
  }
  // 评论
  comment (dynamic, index, event) {
    var actionSheet = eventHandler.getParent(event.target, '.action-sheet')
    confirm( null, '请发表高见......',[
      { text: '取消', onPress: () => {} },
      { text: '确定', onPress: (value) => {
          this.props.saveComment({dynamic: dynamic._id, content: value})
          .then(res => {
            if (res.data.code === global.dictionary.ERR_OK) {
              this.props.updateComment(index, res.data.data)
              // Toast.success(res.data.message, 1)
              actionSheet.classList.remove('opend')
            } else {
              Toast.fail(res.data.message, 1)
            }
          })
        } 
      },
    ])
  }
  
  shouldComponentUpdate (nextProps, nextState) {
    return true
  }
}

export default List