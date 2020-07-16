//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    type: 2, // 2是用户 1是商家
    width: app.systemInfo.windowWidth,
    height: app.systemInfo.windowHeight,
    banner: ['http://i.dxlfile.com/adm/material/2016_12_12/20161212135600242250.jpg',
      'http://i.dxlfile.com/adm/material/2017_01_04/2017010411165785666.jpg',
      'http://i.dxlfile.com/adm/material/2017_01_04/20170104140739205869.jpg',
      'http://i.dxlfile.com/adm/material/2017_01_16/20170116171332214897.jpg'
    ],
    likeList: [],
    recommendList: [],
    hotelInfo: {}
  },
  init() {
    wx.$post('/banner/getAllBanner')
      .then(res => {

      })
    if (wx.type == 2) {
      wx.$post('/site/guessLike', { // 猜你喜欢
        current: 1,
        pageSize: 5
      }).then(data => {
        this.setData({
          likeList: data.data.list
        })
      })
      wx.$post('/site/recommend') // 推荐商家
        .then(data => {
          this.setData({
            recommendList: data.data.list
          })
        })
    }
    if (wx.type == 1) {
      wx.$get('/api/user/getUserInfo')
        .then(data => {
          this.setData({
            hotelInfo: data.data.hotelInfo
          })
        })
    }
  },
  toHotelDetail() {
    wx.navigateTo({
      url: '/pages/hotel/hotelDetail/hotelDetail',
    })
  },
  toField() {
    wx.switchTab({
      url: '/pages/field/field',
    })
  },
  goHotelInfo(e) {
    let id = e.currentTarget.dataset.id
    console.log(id);
    
    wx.navigateTo({
      url: '/pages/hotel/hotelInfo/hotelInfo?id=' + id,
    })
  },
  homeNavClick(e) {
    let index = e.currentTarget.dataset.index;
    switch (index) {
      case '0':
        wx.navigateTo({
          url: '/pages/robOrder/robOrder',
        })
        break;
      case '1':
        wx.navigateTo({
          url: '/pages/robOrder/robOrder',
        })
        break;
      case '2':
        console.log(11)
        wx.navigateTo({
          url: '/pages/mall/mall',
        })
        break;
    }
  },
  onLoad: function () {

  },
  onShow() {
    if (wx.type && wx.type != this.data.type) {
      this.setData({
        type: wx.type
      })
      this.init()
    }
  },
  onReady() {
    this.init()
  },
  fucClick(event) {
    const id = event.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '../storelist/storelist',
    })

  },
  goodDetail(event) {
    wx.navigateTo({
      url: '../goods/goods',
    })
  }

})