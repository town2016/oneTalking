import React from 'react'
import { headImgBg } from '../static/img/images'
import '../static/less/my.less'
class My extends React.Component {
  render () {
    return (
      <div className='my'>
        <div className='head-img'>
          <div className='mask'></div>
          <div className='head-img-bg'>
            <img src={headImgBg} alt='head-img-bg'/>
          </div>
          <div className='head-img-icon'>
            <img src='https://f10.baidu.com/it/u=2465775762,1509670197&fm=72' alt='head-img'/>
          </div>
        </div>
        <div className='func-list'>
          <ul>
            <li><span>昵称</span></li>
            <li><span>活跃指数</span></li>
            <li><span>我的相册</span></li>
          </ul>
        </div>
      </div>
    )
  }
}

export default My
