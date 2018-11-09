import React from 'react'
import '../static/less/gallery.less'
import {connect} from 'react-redux'
@connect(
  state => ({gallery: state})
)
class Gallery extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      winWidth: window.innerWidth,
      curIndex: 0,
      gallerys: null,
      startX: 0,
      endX: 0,
      startTime: 0,
      offsetX: 0
    }
    this.bindEvent = this.bindEvent.bind(this)
    this.startHandler = this.startHandler.bind(this)
    this.moveHandler = this.moveHandler.bind(this)
    this.endHandler = this.endHandler.bind(this)
  }
  render () {
    return (
      <div className={['gallery', this.props.isShow && 'open'].join(' ')} onClick={this.closeHandler}>
        <ul className='gallery-list'>
          {this.props.gallery.map((item, index) => (
            <li key={index} className='galelryItem ' >
              <div className='wrapper flex flex-align-center flex-pack-center'>
                <img src={item.url} alt='imgview'/>
              </div>
            </li>
          ))}
        </ul>
        <nav>
          {this.props.gallery.map((item, index) => (
            <span key={index} className={[this.state.curIndex === index && 'active']}></span>
          ))}
        </nav>
      </div>
    )
  }
  componentWillMount () {
    this.setState({
      curIndex: this.props.goIndex
    })
  }
  componentDidMount () {
    let gallerys = document.querySelectorAll('.galelryItem');
    this.setState({
      gallerys: gallerys
    })
    gallerys.forEach((item, index) => {
      item.style.transform = `translate3d(${index*this.state.winWidth}px, 0, 0)`
    })
    this.bindEvent()
    this.goIndex(this.props.goIndex)
  }
  
  bindEvent () {
    var gallery = document.querySelector('.gallery-list')
    gallery.addEventListener('touchstart', this.startHandler)
    gallery.addEventListener('touchmove', this.moveHandler)
    gallery.addEventListener('touchend', this.endHandler)
  }
  
  startHandler (event) {
    // event.preventDefault()
    this.setState({
      offsetX: 0,
      startX: event.touches[0].pageX * 1,
      startTime: new Date() * 1
    })
  }
  
  moveHandler (event) {
    // event.preventDefault()
    var moveX = event.touches[0].pageX * 1 - this.state.startX
    this.setState({
      offsetX: moveX
    })
    var i = this.state.curIndex - 1
    var m = i + 3
    var lis = document.querySelectorAll('.galelryItem')
    for(i; i < m; i++){
          lis[i] && (lis[i].style.webkitTransition = '-webkit-transform 0s ease-out');
          lis[i] && (lis[i].style.webkitTransform = 'translate3d('+ ((i-this.state.curIndex)*this.state.winWidth + this.state.offsetX) +'px, 0, 0)')
        }
  }
  
  endHandler (event) {
    // event.preventDefault()
    // 边界就翻页值
    var boundary = this.state.winWidth/6;
    // 结束时间
    var endTime = new Date() * 1
    var startTime = this.state.startTime
    
    if (endTime - startTime > 300) {
      if(this.state.offsetX >= boundary){
        this.goIndex('-1')
      }else if(this.state.offsetX < 0 && this.state.offsetX < -boundary){
        this.goIndex('+1')
      }else{
        this.goIndex('0')
      }
    } else {
      if (this.state.offsetX === 0) {
        setTimeout(() => {
          this.props.closeView()
        }, 200)
        return
      }
      if(this.state.offsetX > 50){
        this.goIndex('-1')
      }else if(this.state.offsetX < -50){
        this.goIndex('+1')
      }else{
        this.goIndex('0')
      }
    }
  }
  
  goIndex (n) {
    //如果传数字可以使得直接滑动到该索引
    var lis = document.querySelectorAll('.galelryItem');
    var len = lis.length;
    var cidx;
    if(typeof n == 'number'){
      cidx = this.state.curIndex;
    //如果是传字符则为索引的变化
    }else if(typeof n == 'string'){
      cidx = this.state.curIndex + n * 1
    }
    //当索引右超出
    if(cidx > len - 1){
      cidx = len - 1
    //当索引左超出  
    }else if(cidx < 0){
      cidx = 0
    }
    
    //保留当前索引值
    this.setState({
      curIndex: cidx
    })
    //改变过渡的方式，从无动画变为有动画
    lis[cidx] && (lis[cidx].style.webkitTransition = '-webkit-transform 0.2s ease-out')
    lis[cidx - 1] && (lis[cidx - 1].style.webkitTransition = '-webkit-transform 0.2s ease-out')
    lis[cidx + 1] && (lis[cidx + 1].style.webkitTransition = '-webkit-transform 0.2s ease-out')
    // 当前可见组的图片可见
    lis[cidx].style.opacity = 1
    lis[cidx - 1] && (lis[cidx - 1].style.opacity = 1)
    lis[cidx + 1] && (lis[cidx + 1].style.opacity = 1)
    //改变动画后所应该的位移值
    lis[cidx] && (lis[cidx].style.webkitTransform = 'translate3d(0, 0, 0)');
    lis[cidx - 1] && (lis[cidx - 1].style.webkitTransform = 'translate3d(-'+ this.state.winWidth +'px, 0, 0)')
    lis[cidx + 1] && (lis[cidx + 1].style.webkitTransform = 'translate3d('+ this.state.winWidth +'px, 0, 0)')
    
  }
}

export default Gallery
