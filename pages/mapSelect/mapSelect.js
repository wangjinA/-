// map.js
// https://lbs.qq.com/tool/getpoint/
// 获取坐标系
import {
  getPosition
} from "../../utils/util";
Page({
  data: {
    latitude: 0,
    longitude: 0,
    markers: [{
      iconPath: "../../images/location.png",
      id: 0,
      latitude: 28.710806,
      longitude: 115.760958,
      width: 25,
      height: 25
    }],
    value: '',
    list: [],
    isSearch: false
  },
  onChange(e) {
    this.setData({
      value: e.detail
    })
  },
  onSearch() {
    this.setData({
      isSearch: !this.data.isSearch
    })
    if (!this.data.isSearch) {
      this.setData({
        isSearch: !this.data.isSearch,
        value: '',
      })
      return;
    }
    var QQMapWX = require('../../utils/qqmap-wx-jssdk.min');
    console.log(QQMapWX);

    // 实例化API核心类
    var qqmapsdk = new QQMapWX({
      key: 'JYQBZ-LBGA6-RU6S7-MFKHU-QEK37-2YBZI' // 必填
    });

    // 事件触发，调用接口
    var _this = this;
    // 调用接口

    qqmapsdk.search({
      keyword: this.data.value, //搜索关键词
      location: `${this.data.latitude},${this.data.longitude}`, //设置周边搜索中心点
      success: function (res) { //搜索成功后的回调
        let list = []
        for (var i = 0; i < res.data.length; i++) {
          list.push({ // 获取返回结果，放到mks数组中
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng,
            ...res.data[i]
          })
        }
        _this.setData({ //设置markers属性，将搜索结果显示在地图中
          list
        })
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });


  },
  // 地图点击
  handleClick(e) {
    // const {
    //   longitude,
    //   latitude
    // } = e.detail
    // this.setData({
    //   markers: [{
    //     ...this.data.markers[0],
    //     ...e.detail
    //   }]
    // })
  },
  selectItem(e) {
    let index = e.currentTarget.dataset.id
    const item = this.data.list[index]
    console.log(item);
    
  },
  onReady(e) {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('myMap')
    wx.loadingAPI(getPosition())
    .then(({
      longitude,
      latitude
    }) => {
      this.setData({
        longitude,
        latitude
      })
    }).catch(() => {
      wx.showModal({
        content: '定位失败',
        showCancel: false,
        success: () => {
          wx.navigateBack()
        }
      })
    })
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
      success: function (res) {
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },
  moveToLocation() {
    this.mapCtx.moveToLocation({
      latitude: 28.710806,
      longitude: 115.760958,
    })
    this.getCenterLocation()
  },
  translateMarker() {
    this.mapCtx.translateMarker({
      markerId: 0,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude: 23.10229,
        longitude: 113.3345211,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },
  includePoints() {

  }
})