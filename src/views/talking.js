import React, {Component} from 'react'
import '../static/less/talking.less'
import { connect } from 'react-redux'
import axios from 'axios'
import Auth from '../auth';
import { setPublish } from '../store/talking.redux'
import { Modal, Toast } from 'antd-mobile'
import { Prompt } from 'react-router-dom';
const operation = Modal.operation 
const AMap = window.AMap
@connect(
  state => {return {...state.dynamic, ...state.user}},
  { setPublish }
)
class Talking extends Component {
  constructor (props) {
    super(props)
    this.state = {
      locations: '添加位置信息',
      imgList: [],
      dynamic: '',
      longer: null,
      startTime: 0,
      isLocationOk: false,
      isUnMount: false
    }
    this.changeHadler = this.changeHadler
    this.uploadHandler = this.uploadHandler.bind(this)
    this.touchStartHandler = this.touchStartHandler.bind(this)
    this.touchMoveHandler = this.touchMoveHandler.bind(this)
    this.touchEndHandler = this.touchEndHandler.bind(this)
    this.deleteHanlder = this.deleteHanlder.bind(this)
    this.publishHandler = this.publishHandler.bind(this)
    this.publishCheck = this.publishCheck.bind(this)
  }
  render () {
    return (
      <div className='talking'>
        <Auth/>
        <div className='toper'>
          <button className='publish' onClick={this.publishHandler} disabled={!this.props.ispublish}>发表</button>
        </div>
        <div id='allmap'></div>
        <div className='edit-wrapper'>
          <div className='text-box'>
            <textarea
              className='textarea'
              rows='5'
              placeholder='你想说点什么......'
              onChange={this.changeHadler.bind(this, 'dynamic')}>
            </textarea>
          </div>
          <div className='upload-box clearfix'>
            {this.state.imgList.map((item, index) => (
              <div className='upload-item' key={index} 
                onTouchStart={this.touchStartHandler.bind(this, item, index)}
                onTouchMove={this.touchMoveHandler}
                onTouchEnd={this.touchEndHandler}>
                <img src={item} alt='img'/>
              </div>
            ))}
            <div className='uplaod-control upload-item'>
              <form id='imgForm'>
                <span className='icon-add'></span>
                <input type='file' name='files' multiple="multiple" accept="image/*" onChange={this.uploadHandler} id='uploadControl'/>
              </form>
            </div>
          </div>
          <div className='position-box flex flex-align-center' onClick={this.getLocation.bind(this)}>
            <span className='icon-location_fill icon'></span>
            <span className='address flex-1' style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{this.state.locations}</span>
          </div>
          <Prompt message={'是否放弃本次编辑?'}  when={this.props.ispublish}/>
        </div>
      </div>
    )
  }
  // 表单
  changeHadler (k, event) {
    this.setState({
      [k]: event.target.value
    }, () => {
      this.publishCheck()
    })
  }
  // 定位
  getLocation () {
    var map = new AMap.Map('allmap', {
      resizeEnable: true,
      zoom: 14
    })
    var that = this
    map.plugin('AMap.Geolocation', function() {
      var geolocation = new AMap.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: true,
        // 设置定位超时时间，默认：无穷大
        timeout: 5000,
        // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
        buttonOffset: new AMap.Pixel(10, 20),
        //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        zoomToAccuracy: true,     
        //  定位按钮的排放位置,  RB表示右下
        buttonPosition: 'RB'
      })
      that.setState({locations: '定位中...'})
      geolocation.getCurrentPosition()
      AMap.event.addListener(geolocation, 'complete', onComplete)
      AMap.event.addListener(geolocation, 'error', onError)
    
      function onComplete (data) {
        if (!that.state.isUnMount) {
          console.log(data)
          that.setState({
            locations: data.formattedAddress ? data.formattedAddress.split('区')[1] : '获取位置信息失败',
            isLocationOk: true
          })
        }
        aMapSearchNearBy([data.position.lng,data.position.lat], data.addressComponent.city)
      }
    
      function onError (data) {
        if (!that.state.isUnMount) {
          setTimeout(() => {
            that.setState({
             locations: '获取位置信息失败，请稍后重试'
            })
          }, 200)
        }
      }
    })
    
    // 高德地图查询周边
    function aMapSearchNearBy(centerPoint, city) {
        AMap.service(["AMap.PlaceSearch"], function() {
          var placeSearch = new AMap.PlaceSearch({
            pageSize: 10,    // 每页10条
            pageIndex: 1,    // 获取第一页
            city: city       // 指定城市名(如果你获取不到城市名称，这个参数也可以不传，注释掉)
        });
          // 第一个参数是关键字，这里传入的空表示不需要根据关键字过滤
          // 第二个参数是经纬度，数组类型
          // 第三个参数是半径，周边的范围
          // 第四个参数为回调函数
          placeSearch.searchNearBy('', centerPoint, 200, function(status, result) {
            if(result.info === 'OK') {
                // var locationList = result.poiList.pois; // 周边地标建筑列表
            } else {
                 console.log('获取位置信息失败!');
            }
          });
       });
    }
  }
  // 图片上传
  uploadHandler () {
    var formData = new FormData(document.getElementById('imgForm'))
    document.getElementById('uploadControl').value = ''
    axios.post('/api/fileUpload', formData).then(res => {
      if (res.data.code === global.dictionary.ERR_OK) {
        this.setState({
          imgList: this.state.imgList.concat(res.data.data)
        })
        this.publishCheck()
      } else {
        Toast.fail(res.data.message, 2, null, false)
      }
    })
  }
  
  // 图片长按事件
  touchStartHandler (img, index, event) {
    event.preventDefault()
    this.setState({
      longer: setTimeout(() => {
        operation([
          { text: '删除图片', onPress: () => {
              this.deleteHanlder(img, index)
            }
          }
        ])
      }, 600),
      startTime: new Date().getTime()
    })
  }
  touchMoveHandler (event) {
    event.preventDefault()
    window.clearTimeout(this.state.longer)
  }
  touchEndHandler (event) {
    event.preventDefault()
    let endTime = new Date().getTime()
    if (endTime - this.state.startTime < 500) {
      window.clearTimeout(this.state.longer)
    }
  }
  // 图片删除
  deleteHanlder (item, index) {
    var filePath = item.split('/')
    var fileName = filePath[filePath.length - 1]
    axios.get('/api/fileDelete', {params: {fileName: fileName}}).then(res => {
      if (res.data.code === global.dictionary.ERR_OK) {
        Toast.success(res.data.message, 2, null, false)
        var imgList = this.state.imgList
        imgList.splice(index, 1)
        this.setState({
          imgList: imgList
        }, () => {
          this.publishCheck()
        })
      } else {
        Toast.fail(res.data.message, 2, null, false)
      }
    })
  }
  publishCheck () {
    if (this.state.dynamic.trim().length === 0 && this.state.imgList.length === 0) {
      this.props.setPublish({ispublish: false})
    } else {
      this.props.setPublish({ispublish: true})
    } 
  }
  // 发表动态
  publishHandler () {
    var params = {
      dynamic: this.state.dynamic,
      locations: this.state.isLocationOk ? this.state.locations : '',
      imgList: this.state.imgList
    }
    axios.post('/api/createDynamic', params).then(res => {
      if (res.data.code === global.dictionary.ERR_OK) {
        this.props.setPublish({ispublish: false})
        this.props.history.push('/hot')
      } else {
        Toast.fail(res.data.message, 2, null, false)
      }
    })
  }
  componentWillUnmount () {
    this.setState({
      isUnMount: true
    })
    this.props.setPublish({ispublish: false})
  }
  
}

export default Talking