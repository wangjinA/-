// map.js
// https://lbs.qq.com/tool/getpoint/
// 获取坐标系
Page({
  data: {
    latitude:28.710806,
    longitude:115.760958,
    markers: [{
      iconPath: "../../images/location.png",
      id: 0,
      latitude: 28.710806,
      longitude: 115.760958,
      width: 25,
      height: 25
    }],
  },
  onReady (e) {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('myMap')
    
    // this.mapCtx.includePoints({
    //   padding: [10],
    //   points: [, {
    //     latitude:28.6964927449790,
    //     longitude:115.7659136384692,
    //   }]
    // })
  },
  getCenterLocation() {
    this.mapCtx.getCenterLocation({
      success: function(res){
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },
  moveToLocation () {
    this.mapCtx.moveToLocation({
      latitude:28.710806,
      longitude:115.760958,
    })
    this.getCenterLocation()
  },
  translateMarker() {
    this.mapCtx.translateMarker({
      markerId: 0,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude:23.10229,
        longitude:113.3345211,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },
  includePoints() {
    
  }
})