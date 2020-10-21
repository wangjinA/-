//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    type: 2, // 2是用户 1是商家
    width: app.systemInfo.windowWidth,
    height: app.systemInfo.windowHeight,
    banner: [],
    likeList: [],
    recommendList: [],
    hotelInfo: {},
    noticeList: [],
    noticeIndex: 0,
    isLogin: false
  },
  replay(e) { // 每当滚动栏重新开始滚动时触发
    console.log(e);
    console.log('每当滚动栏重新开始滚动时触发');

  },
  loadUserInfo() {
    wx.$get('/api/user/getUserInfo')
      .then(res => {
        if(res.code == '20'){// token失效
          wx.clearStorageSync('token')
          this.setData({
            isLogin: false
          })
        }else {
          wx.userInfo = res.data.userInfo
          wx.hotelInfo = res.data.hotelInfo || {}
          wx.roles = res.data.roles || [] // 1管理 2会议 3婚宴
          wx.roleId = res.data.roles && res.data.roles[0] && res.data.roles[0].id
          wx.hotelId = res.data.userInfo.hotelId
        }
        this.setData({
          isLogin: true
        })
      })
  },
  init() {
    wx.$post('/banner/getAllBanner')
      .then(res => {
        this.setData({
          banner: res.data.list.filter(item => item.type == wx.type)
        })
      })
    wx.$get('/notice/selectNoticePage', {
      current: 1,
      pageSize: 10,
    }).then(res => {
      console.log(res);
      this.setData({
        noticeList: res.data.list.filter(item => item.type == wx.type)
      })
      this.noticeToggle()
    })
    if (wx.type == 2) {
      wx.$post('/site/guessLike', { // 猜你喜欢
        current: 1,
        pageSize: 5
      }).then(data => {
        this.setData({
          likeList: data.data.list || []
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
  noticeToggle() {
    clearInterval(this.$timer)
    this.data.noticeIndex = 0
    if(this.data.noticeList.length > 1) {
      this.$timer = setInterval(() => {
        let noticeIndex = this.data.noticeIndex;
        noticeIndex++
        if (this.data.noticeIndex >= this.data.noticeList.length) {
          noticeIndex = 0
        }
        this.setData({
          noticeIndex
        })
      }, 10000);
    }
  },
  toHotelDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/hotel/hotelDetail/hotelDetail?id='+id,
    })
  },
  toField() {
    wx.switchTab({
      url: '/pages/field/field',
    })
  },
  checkLogin() {
    if(!this.data.isLogin){
      wx.navigateTo({
        url:'/pages/welcome/welcome'
      })
      return true
    }
  },
  goHotelInfo(e) {
    if(this.checkLogin()){
      return 
    }
    if(!wx.hotelId){
      return wx.showToast({
        title: '暂未获取到酒店信息',
        icon: 'none'
      })
    }

    wx.navigateTo({
      url: '/pages/hotel/hotelInfo/hotelInfo'
    })
  },
  homeNavClick(e) {
    if(this.checkLogin()){
      return 
    }
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
    // if(!wx.userInfo){
    //   wx.clearStorageSync('token')
    // }

    this.setData({
      type: wx.type,
      isLogin: !!wx.getStorageSync('token')
    })
    
    this.loadUserInfo()
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