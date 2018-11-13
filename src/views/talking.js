import React, {Component} from 'react'
import '../static/less/talking.less'
const AMap = window.AMap
class Talking extends Component {
  render () {
    return (
      <div className='talking'>
        <div id='allmap'></div>
        <div className='edit-wrapper'>
          <div className='text-box'>
            <textarea className='textarea' rows='5' placeholder='你想说点什么......'></textarea>
          </div>
          <div className='upload-box clearfix'>
            <div className='upload-item'>
              <img src='https://f10.baidu.com/it/u=2465775762,1509670197&fm=72'/>
            </div>
            <div className='uplaod-control upload-item'>
              <span className='icon-add'></span>
              <input type='file' multiple="multiple" accept="image/*"/>
            </div>
          </div>
          <div className='position-box flex flex-align-center'>
            <span className='icon-location_fill icon'></span>
            <span className='address flex-1'>中投商务中心</span>
          </div>
        </div>
        
      </div>
    )
  }
  componentDidMount () {
    var map = new AMap.Map('allmap', {
      resizeEnable: true,
      zoom: 14
    })
    
    map.plugin('AMap.Geolocation', function() {
      var geolocation = new AMap.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: true,
        // 设置定位超时时间，默认：无穷大
        timeout: 10000,
        // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
        buttonOffset: new AMap.Pixel(10, 20),
        //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        zoomToAccuracy: true,     
        //  定位按钮的排放位置,  RB表示右下
        buttonPosition: 'RB'
      })
    
      geolocation.getCurrentPosition()
      AMap.event.addListener(geolocation, 'complete', onComplete)
      AMap.event.addListener(geolocation, 'error', onError)
    
      function onComplete (data) {
        // data是具体的定位信息
        console.log(data)
        map.setZoomAndCenter(14, [data.position.lng,data.position.lat]);
        // 在新中心点添加 marker 
        var center = new AMap.Marker({
            map: map,
            title: '中投国际大厦',
            position: [data.position.lng,data.position.lat]
        });
        center.setTitle(data.addressComponent.building)
        center.setLabel({
            //修改label相对于maker的位置
            offset: new AMap.Pixel(10, 20),
            content: '<div class="info">'+ data.addressComponent.building +'</div>'
        });
        aMapSearchNearBy([data.position.lng,data.position.lat], data.addressComponent.city)
      }
    
      function onError (data) {
        document.getElementById('result').innerHTML = '获取位置信息失败，请稍后重试'
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
                var locationList = result.poiList.pois; // 周边地标建筑列表
            } else {
                 console.log('获取位置信息失败!');
            }
          });
       });
    }
    
  }

}

export default Talking